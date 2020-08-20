import webpack, { Configuration } from 'webpack'
import path from 'path'

// pofore.config.json
const poforeConfig = require(path.join(process.cwd(), 'pofore.config.js'))
interface StringObj {
  [key:string]:string
}
const definePluginData:StringObj = {}
Object.keys(poforeConfig.defineData || {}).forEach(itemKey => {
  definePluginData[itemKey] = JSON.stringify(poforeConfig.defineData[itemKey])
})

const config: Configuration = {
  externals: [
    ...poforeConfig.externals || []
  ],
  entry: `${process.cwd()}/src/index.ts`,
  target: 'node',
  output: {
    path: `${process.cwd()}/dist`,
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: `${__dirname}/buildbug.loader.js`
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(definePluginData)
  ]
}

export default config
