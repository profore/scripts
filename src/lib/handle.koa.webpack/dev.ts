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
          './webpack.config/webpack.dev.js'
        )
      ]
    ]
    require('webpack-cli')

    // 修改变量, 触发 nodemon
    process.argv = [
      ...process.argv.slice(0, 2),
      ...[
        'dist/index.js',
        '--watch',
        'dist/index.js'
      ]
    ]
    require('nodemon/bin/nodemon')
  } catch (error) {
    console.log(error)
  }
}
