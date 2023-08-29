# @libit/sn

> A simple Node.js module for accessing the serial number of the local machine. Supports Linux, Mac (OS X), Windows, and
> FreeBSD.

## Installation

```bash
npm i @libit/sn
```

## Usage

Retrieve the serial number form system asynchronously.

```ts
import {sn} from '@libit/sn';

const serial = await sn();
console.log(serial);
```

If the serial number turns out to be invalid (common on VMs), the system's UUID value will be provided as a fallback. To
instead try to get the UUID on the first attempt, use `uuid` option:

```ts
const serial = await sn({uuid: true});
```

To prefix the system command with `sudo`, use `sudo` option:

```ts
const serial = await sn({sudo: true});
```

## sn(options)

```ts
async function sn(options: SnOptions = {});
```

Retrieve the serial number form system asynchronously.

**Options**

- `cwd` - The custom current working directory
- `file` - The custom cache file name
- `prefix` - A string to be prefixed ahead of the shell command to be run. Can be used to specify a path to the
  `dmidecode` binary on \*nix systems if it won't be found in the environment \$PATH
- `sudo` - True to prefix the system command with `sudo`. Default is false
- `uuid` - True to instead try to get the UUID on the first attempt. Default is false
- `hash` - True to return the hashed serial number, or pass a custom hash function to digest. Default is false.
- `size` - Slice the serial number to specified size

## setup(options)

In the case that sudo is required to obtain the serial number, call setup to obtain and cache the serial number in
advance so that the serial number can be obtained without sudo in the future.

When the application runs for the first time:

```ts
await setup({...});
```

When the application runs later:

```ts
await sn({...});
```
