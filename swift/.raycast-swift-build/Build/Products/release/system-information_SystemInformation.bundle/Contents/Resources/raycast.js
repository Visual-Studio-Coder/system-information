export async function getStorageInfo() {
  return await runSwiftFunction("getStorageInfo")
}