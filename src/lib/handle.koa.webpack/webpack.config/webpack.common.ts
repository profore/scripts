import { Configuration } from 'webpack'

const config: Configuration = {
  entry: `${process.cwd()}/src/index.ts`,
  target: 'node',
  output: {
    path: `${process.cwd()}/dist`,
    filename: 'index.js'
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
  }
}

export default config
