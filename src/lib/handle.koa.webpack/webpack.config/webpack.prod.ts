import merge from 'webpack-merge'
import common from './webpack.common'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

export default merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin()
  ]
})
