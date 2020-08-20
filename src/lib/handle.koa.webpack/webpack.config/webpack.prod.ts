import merge from 'webpack-merge'
import common from './webpack.common'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import fs from 'fs'
import path from 'path'
import webpack from 'webpack'

const plugins = [
  new CleanWebpackPlugin(),
  new webpack.DefinePlugin({
    WEBPACK_MODE: JSON.stringify('production')
  })
]
// 如果有public文件夹
if (fs.existsSync(path.join(process.cwd(), 'public'))) {
  plugins.push(new CopyWebpackPlugin({ patterns: ['public'] }))
}

export default merge(common, {
  mode: 'production',
  plugins
})
