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
  try {
    if (!poforeConfig.ossDeploy) return console.log('poforeConfig.ossDeploy not fined')
    const { uploadDir, ossConfig } = poforeConfig.ossDeploy
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
  } catch (error) {
    console.log(error)
  }
}
