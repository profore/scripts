import path from 'path'

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
  } catch (error) {
    console.log(error)
  }
}
