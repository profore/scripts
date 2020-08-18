import merge from 'webpack-merge'
import common from './webpack.common'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import fs from 'fs'
import path from 'path'

const plugins = []
plugins.push(new CleanWebpackPlugin())
// 如果有public文件夹
if (fs.existsSync(path.join(process.cwd(), 'public'))) {
  plugins.push(new CopyWebpackPlugin({ patterns: ['public'] }))
}

export default merge(common, {
  mode: 'production',
  plugins
})
