import path from 'path'
import fs from 'fs'
import OSS from 'ali-oss'

// pofore.config.json
const poforeConfig = require(path.join(process.cwd(), 'pofore.config.js'))

function readFileList (dir:string, filesList:string[] = []) {
  const files = fs.readdirSync(dir)
  files.forEach((name) => {
    const fullPath = `${dir}/${name}`
    if (fs.statSync(fullPath).isDirectory()) {
      readFileList(fullPath, filesList) // 递归读取文件
    } else {
      filesList.push(fullPath)
    }
  })
  return filesList
}

export default async ():Promise<void> => {
  if (!poforeConfig.ossDeploy) return console.log('poforeConfig.ossDeploy not fined')
  const { uploadDir, ossConfig } = poforeConfig.ossDeploy

  // 提升安全性 将 accessKey 封装到全局环境配置
  if (!ossConfig.accessKeyId || !ossConfig.accessKeySecret) {
    // 如果有原配置文件 读取
    const hasRootConfigFile = fs.existsSync(path.join(process.env.USERPROFILE || process.cwd(), '.pofore.js'))
    if (hasRootConfigFile) {
      const rootConfig = require(path.join(process.env.USERPROFILE || process.cwd(), '.pofore.js'))
      // AliyunAccessKey
      ossConfig.accessKeyId = rootConfig.AliyunAccessKeyId
      ossConfig.accessKeySecret = rootConfig.AliyunAccessKeySecret
    } else {
      throw new Error('\n No AliyunAccessKey init \n -- use "pofore-scripts init" --')
    }
  }

  const ossClient = new OSS(ossConfig)
  const arr = readFileList(uploadDir)
  console.log(arr)
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index]
    const reg = new RegExp(`${uploadDir}/`)
    const ossUrl = element.replace(reg, '')
    await ossClient.put(ossUrl, element)
    console.log('done', ossUrl)
  }
  console.log('done all')
}
