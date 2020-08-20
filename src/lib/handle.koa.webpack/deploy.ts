import inquirer from 'inquirer'
import { getRandomNum } from '../utils'

export default async ():Promise<void> => {
  try {
    // 发布版本
    const { deployType } = await inquirer.prompt({
      type: 'list',
      message: '选择发布环境:',
      name: 'deployType',
      choices: [{ name: '测试服 development', value: 'dev' }, { name: '正式服 production', value: 'pro' }]
    })
    const vcode = getRandomNum(6)
    await inquirer.prompt({
      type: 'input',
      name: 'icode',
      message: `确认发布至 ${deployType}? 验证码(${vcode}):`,
      validate: value => vcode === value
    })
    // 执行逻辑
    const handle = await import('./handle.deploy')
    await handle.default(deployType)
  } catch (error) {
    console.log(error)
  }
}
