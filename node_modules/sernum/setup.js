'use strict';

const fs = require('fs');
const path = require('path');
const sn = require('.');

const cacheFile = path.join(__dirname, 'cache');

const fail = function (err) {
  console.error('Could not read serial number:', err);
};

if (fs.existsSync(cacheFile)) {
  fs.unlinkSync(cacheFile);
}

(async () => {
  try {
    await sn({ignoreCache: true});
  } catch (err) {
    if (process.platform !== 'win32' && err && err.toString().match(/Permission denied/i)) {
      [
        '\x1B[7m' + // inverse style
        'Your system requires root/administrative privilege to access the serial number.' +
        '\x1B[27m',

        '\x1B[31m' + // red
        'Attempting to run command with `sudo` and cache your serial for future use.' +
        '\x1B[39m'
      ].forEach(msg => console.info(msg));

      try {
        const val = await sn.sudo();

        try {
          fs.writeFileSync(cacheFile, val);
          console.info('\x1B[32m' + 'Successfully cached serial number' + '\x1B[39m');
        } catch (err) {
          console.error('Could not write serial number cache file:', err);
        }

      } catch (err) {
        fail(err);
      }
    } else {
      fail(err);
    }
  }
})();


