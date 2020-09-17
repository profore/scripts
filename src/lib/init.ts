import inquirer from 'inquirer'
import fs from 'fs'
import path from 'path'

export default async ():Promise<void> => {
  try {
    // 执行逻辑

    // 默认配置
    let rootConfig = {
      AliyunAccessKeyId: '',
      AliyunAccessKeySecret: ''
    }

    // 如果有原配置文件 读取
    const hasRootConfigFile = fs.existsSync(path.join(process.env.USERPROFILE || '.', '.pofore.js'))
    if (hasRootConfigFile) {
      try {
        rootConfig = require(path.join(process.env.USERPROFILE || '.', '.pofore.js'))
      } catch (error) {
        console.log(error)
      }
    }

    // 问询 获取新的配置
    const { AliyunAccessKeyId, AliyunAccessKeySecret } = await inquirer.prompt([
      {
        type: 'input',
        name: 'AliyunAccessKeyId',
        message: 'AliyunAccessKeyId',
        default: rootConfig.AliyunAccessKeyId || undefined
      },
      {
        type: 'input',
        name: 'AliyunAccessKeySecret',
        message: 'AliyunAccessKeySecret',
        default: rootConfig.AliyunAccessKeySecret || undefined
      }
    ])

    // 创建新的文件
    fs.writeFileSync(path.join(process.env.USERPROFILE || '.', '.pofore.js'),
`module.exports = {
  AliyunAccessKeyId: '${AliyunAccessKeyId}',
  AliyunAccessKeySecret: '${AliyunAccessKeySecret}',
}`)
  } catch (error) {
    console.log(error)
  }
}
