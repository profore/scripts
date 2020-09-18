import inquirer from 'inquirer'
import fs from 'fs'
import path from 'path'

export default async ():Promise<void> => {
  // 默认配置
  let rootConfig = {
    AliyunAccessKeyId: '',
    AliyunAccessKeySecret: ''
  }

  // 如果有原配置文件 读取
  const hasRootConfigFile = fs.existsSync(path.join(process.env.USERPROFILE || process.cwd(), '.pofore.js'))
  if (hasRootConfigFile) {
    rootConfig = require(path.join(process.env.USERPROFILE || process.cwd(), '.pofore.js'))
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
  fs.writeFileSync(path.join(process.env.USERPROFILE || process.cwd(), '.pofore.js'),
`module.exports = {
  AliyunAccessKeyId: '${AliyunAccessKeyId}',
  AliyunAccessKeySecret: '${AliyunAccessKeySecret}',
}`)
}
