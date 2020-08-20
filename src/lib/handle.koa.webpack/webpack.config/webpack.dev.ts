import merge from 'webpack-merge'
import common from './webpack.common'
import webpack from 'webpack'

export default merge(common, {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  watch: true,
  watchOptions: {
    poll: 1000, // 监测修改的时间(ms)
    aggregateTimeout: 500, // 防止重复按键，500毫秒内算按键一次
    ignored: /node_modules/ // 不监测
  },
  plugins: [
    new webpack.DefinePlugin({
      WEBPACK_MODE: JSON.stringify('development')
    })
  ]
})
