import path from 'path'
import fs from 'fs'
import FC2 from '@alicloud/fc2'
import AdmZip from 'adm-zip'

// pofore.config.json
const poforeConfig = require(path.join(process.cwd(), 'pofore.config.js'))

export default async ():Promise<void> => {
  if (!poforeConfig.koaWebpackDeploy) return console.log('poforeConfig.koaWebpackDeploy not fined')
  const { distDir, serviceName, funName, FCCroot, FCCobj } = poforeConfig.koaWebpackDeploy

  // 提升安全性 将 accessKey 封装到全局环境配置
  if (!FCCobj.accessKeyID || !FCCobj.accessKeySecret) {
    // 如果有原配置文件 读取
    const hasRootConfigFile = fs.existsSync(path.join(process.env.USERPROFILE || process.cwd(), '.pofore.js'))
    if (hasRootConfigFile) {
      const rootConfig = require(path.join(process.env.USERPROFILE || process.cwd(), '.pofore.js'))
      // AliyunAccessKey
      FCCobj.accessKeyID = rootConfig.AliyunAccessKeyId
      FCCobj.accessKeySecret = rootConfig.AliyunAccessKeySecret
    } else {
      throw new Error('\n No AliyunAccessKey init \n -- use "pofore-scripts init" --')
    }
  }

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
