# HardwareId
## Return the computer serial number, along with username, platform and hardware architecture
Works on Mac, Windows, Linux, FreeBSD

## Install
```js
npm i hardwareid
```

## Usage
```js
import hardwareid from "hardwareid"

let sn = await hardwareid()
console.log(sn)
```

This outputs:
```js
{
  username: 'SomeUsername',
  serial: 'ABCDEFGH12345',
  platform: 'darwin',
  arch: 'x64'
}
```

## Credit
[@bresnow](https://github.com/bresnow/chainlocker)
