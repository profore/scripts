import path from 'path'
import fs from 'fs'

export default async ():Promise<void> => {
  try {
    // 修改变量, 触发 webpack
    process.argv = [
      ...process.argv.slice(0, 2),
      ...[
        '--config',
        path.join(
          __dirname,
          './webpack.config/webpack.prod.js'
        )
      ]
    ]
    require('webpack-cli')

    // 提前创建 dist/index.js 防止报错
    if (!fs.existsSync('dist')) fs.mkdirSync('dist')
    if (!fs.existsSync('dist/index.js')) fs.writeFileSync('dist/index.js', '')
    // 进入dist 与dev一致
    process.chdir('dist')
  } catch (error) {
    console.log(error)
  }
}
