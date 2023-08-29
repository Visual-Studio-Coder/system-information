#!/usr/bin/env node

(async () => {
  try {
    console.log(await require('..')());
  } catch (err) {
    console.error(err);
  }
})();

