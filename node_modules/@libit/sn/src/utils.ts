import crypto from 'crypto';
import execa from 'execa';

export const DEFAULT_DELIMITER = /[:\n]/;

export function digester(alg: string) {
  return (data: string) => crypto.createHash(alg).update(data).digest('hex');
}

export interface ExecuteOptions {
  delimiter?: RegExp;
  ignores?: RegExp[];
}

export async function execute(cmd: string, options?: ExecuteOptions) {
  const {stdout} = await execa.command(cmd.trim(), {shell: true});
  const answer = stdout
    ?.trim()
    .split(options?.delimiter ?? DEFAULT_DELIMITER)
    .pop()
    ?.trim();
  return !answer || options?.ignores?.some(ig => ig.test(answer)) ? undefined : answer;
}

export function executeSync(cmd: string, options?: ExecuteOptions) {
  const {stdout} = execa.commandSync(cmd.trim(), {shell: true});
  const answer = stdout
    ?.trim()
    .split(options?.delimiter ?? DEFAULT_DELIMITER)
    .pop()
    ?.trim();
  return !answer || options?.ignores?.some(ig => ig.test(answer)) ? undefined : answer;
}
