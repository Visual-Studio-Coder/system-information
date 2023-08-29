import os from 'node:os'
import { $, ProcessOutput } from 'zx'

const HardwareId = async function(){
  let sn = ProcessOutput
  $.verbose = false
  
  switch (os.platform()) {
    case 'win32':
      sn = await $`wmic csproduct get`
      break
    case 'darwin':
      sn = await $`system_profiler SPHardwareDataType | grep "Serial"`
      break
    case 'linux':
      if (os.arch() === 'arm') {
        sn = await $`cat /proc/cpuinfo | grep UUID`
      } else {
        sn = await $`dmidecode -t system  | grep UUID`
      }
      break
    case 'freebsd':
      sn = await $`dmidecode -t system`
      break
  }

  function getImmutableMachineInfo() {
    let username = os.userInfo().username,
      serial = sn.stdout.split(':')[1].trim(),
      platform = os.platform(),
      arch = os.arch()
    return { username, serial, platform, arch }
  }

  return getImmutableMachineInfo()
}
export default HardwareId