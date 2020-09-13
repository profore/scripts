import merge from 'webpack-merge'
import common from './webpack.common'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import webpack from 'webpack'

export default merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      WEBPACK_MODE: JSON.stringify('production')
    })
  ]
})
