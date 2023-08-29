import {resolveCacheFilePath, sn, SnOptions} from './sn';
import chalk from 'chalk';
import * as fs from 'fs-extra';

const fail = (e: Error) => console.error('Could not read serial number:', e);

export async function setup(options: SnOptions = {}): Promise<string | undefined> {
  try {
    return await sn(options);
  } catch (e) {
    if (process.platform !== 'win32' && e.toString().match(/Permission denied/i)) {
      console.info(chalk.inverse('Your system requires root/administrative privilege to access the serial number.'));
      console.info(chalk.red('Attempting to run command with `sudo` and cache your serial for future use.'));
      return await snWithSudo(options);
    } else {
      fail(e);
    }
  }
}

async function snWithSudo(options: SnOptions) {
  try {
    const serial = await sn({...options, sudo: true});
    const file = resolveCacheFilePath(options);
    try {
      await fs.writeFile(file, serial);
      console.info(chalk.green('Successfully cached serial number'));
      return serial;
    } catch (e) {
      console.error('Could not write serial number cache file:', e);
    }
  } catch (e) {
    fail(e);
  }
}
