export default async (type:string):Promise<void> => {
  try {
    // 执行逻辑
    const handle = await import(`./handle.${type}/build`)
    await handle.default()
  } catch (error) {
    console.log(error)
  }
}
