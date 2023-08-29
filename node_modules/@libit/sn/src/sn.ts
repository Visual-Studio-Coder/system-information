import path from 'path';
import * as fs from 'fs-extra';
import {digester, execute, executeSync} from './utils';

export const DEFAULT_KEYS = ['Serial', 'UUID'];

export const COMMANDS: Record<
  string,
  {
    keys?: string[] | (() => string[]);
    cmd: string | (() => string);
  }
> = {
  darwin: {
    keys: DEFAULT_KEYS,
    cmd: 'system_profiler SPHardwareDataType | grep',
  },
  linux: {
    keys: () => (process.arch === 'arm' ? ['Serial'] : DEFAULT_KEYS),
    cmd: () => (process.arch === 'arm' ? 'cat /proc/cpuinfo | grep' : 'dmidecode -t system | grep'),
  },
  win32: {
    cmd: 'wmic csproduct get IdentifyingNumber',
  },
  freebsd: {
    keys: DEFAULT_KEYS,
    cmd: 'dmidecode -t system | grep',
  },
};

const IGNORES = [/To be filled by O\.E\.M\./i];

export const digest = digester('sha256');

export type DigestFn = (data: string) => string;

export interface SnOptions {
  prefix?: string;
  cwd?: string;
  file?: string;
  sudo?: boolean;
  uuid?: boolean;
  hash?: boolean | DigestFn;
  size?: number;
}

/**
 * Retrieve the serial number form system asynchronously
 *
 * @param options The options object.
 * @param options.cwd The custom current working directory
 * @param options.file The custom cache file name
 * @param options.prefix A string to be prefixed ahead of the shell
 *  command to be run. Can be used to specify a path to the `dmidecode` binary
 *  on *nix systems if it won't be found in the environment $PATH
 * @param options.sudo True to prefix the system command with `sudo`.
 *  Default is false
 * @param options.uuid True to instead try to get the UUID on the
 *  first attempt. Default is false
 * @param options.hash True to return the hashed serial number,
 *  or pass a custom hash function to digest. Default is false.
 * @param options.size Slice the serial number to specified size
 */
export async function sn(options: SnOptions = {}) {
  let answer = await retrieve(options);
  if (answer) {
    answer = postprocess(answer, options);
  }
  return answer;
}

export function snSync(options: SnOptions = {}) {
  let answer = retrieveSync(options);
  if (answer) {
    answer = postprocess(answer, options);
  }
  return answer;
}

function postprocess(serial: string, options: SnOptions = {}) {
  if (options.hash) {
    const hash: DigestFn = typeof options.hash === 'function' ? options.hash : digest;
    serial = hash(serial);
  }
  if (options.size) {
    serial = serial.substr(0, options.size);
  }
  return serial;
}

async function retrieve(options: SnOptions) {
  const commands = findCommands(options);
  for (const command of commands) {
    const answer = await execute(command, {ignores: IGNORES});
    if (answer) return answer;
  }

  // retrieve from cache
  const file = resolveCacheFilePath(options);

  if (await fs.pathExists(file)) {
    return (await fs.readFile(file, 'utf8')).trim();
  }
}

function retrieveSync(options: SnOptions) {
  const commands = findCommands(options);
  for (const command of commands) {
    const answer = executeSync(command, {ignores: IGNORES});
    if (answer) return answer;
  }

  // retrieve from cache
  const file = resolveCacheFilePath(options);

  if (fs.pathExistsSync(file)) {
    return fs.readFileSync(file, 'utf8').trim();
  }
}

function findCommands(options: SnOptions) {
  const platform = COMMANDS[process.platform];
  if (!platform) {
    throw new Error('Cannot provide serial number for ' + process.platform);
  }
  const cmd = typeof platform.cmd === 'function' ? platform.cmd() : platform.cmd;
  let keys = typeof platform.keys === 'function' ? platform.keys() : platform.keys;
  if (options.uuid && keys) {
    keys = keys.reverse();
  }
  keys = keys ?? [''];

  const prefix = options.prefix ?? (options.sudo ? 'sudo ' : '');
  return keys.map(key => `${prefix}${cmd} ${key}`);
}

export interface CacheOptions {
  cwd?: string;
  file?: string;
}

export function resolveCacheFilePath(options: CacheOptions = {}) {
  const cwd = options.cwd ?? process.cwd();
  const file = options.file ?? '.sn';
  return path.resolve(cwd, file);
}
