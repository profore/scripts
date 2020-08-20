export default async (type:string):Promise<void> => {
  try {
    // 执行逻辑
    const handle = await import(`./handle.${type}/deploy`)
    await handle.default()
  } catch (error) {
    console.log(error)
  }
}
