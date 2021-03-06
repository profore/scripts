export default async (type:string):Promise<void> => {
  const handle = await import(`./handle.${type}/deploy`)
  await handle.default()
}
