import path from 'path'
import fs from 'fs'
import FC2 from '@alicloud/fc2'
import AdmZip from 'adm-zip'

// pofore.config.json
const poforeConfig = require(path.join(process.cwd(), 'pofore.config.js'))

export default async (deployType:string):Promise<void> => {
  if (!poforeConfig[`${deployType}Deploy`]) return console.log(`poforeConfig.${deployType}Deploy not fined`)
  const { distDir, serviceName, funName, FCCroot, FCCobj } = poforeConfig[`${deployType}Deploy`]

  const FCClient = new FC2(FCCroot, FCCobj)
  const fileName = `${funName}.zip`

  // 打包
  // 如果有一个叫 build.zip 的压缩文件则读取
  const zip = new AdmZip(fs.existsSync('dist/build.zip') ? 'dist/build.zip' : undefined)
  zip.addLocalFolder(distDir)
  zip.writeZip(fileName)

  // 发布：发布至aliyunServerless
  await FCClient.updateFunction(serviceName, funName, {
    handler: 'index.handler',
    code: {
      zipFile: Buffer.from(fs.readFileSync(fileName)).toString('base64')
    }
  })
  // 删除临时文件
  fs.unlinkSync(fileName)
  console.log('done')
}
