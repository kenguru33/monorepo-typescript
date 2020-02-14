const nodeExternals = require('webpack-node-externals')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const path = require('path')
const buildOpts =
  process.env.NODE_ENV === 'production'
    ? { mode: 'production', devtool: false }
    : { mode: 'none', devtool: 'inline-source-map' }
module.exports = {
  mode: buildOpts.mode,
  devtool: buildOpts.devtool,
  entry: path.resolve(__dirname, './src/index.ts'),
  stats: true,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    library: '',
    // umd for support of commonjs and amd package
    libraryTarget: 'umd'
  },
  // dont bundle packages listed in package.json
  externals: [
    nodeExternals({
      modulesFromFile: true
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new ProgressBarPlugin({
      format:
        '  build [:bar] ' +
        chalk.green.bold(':percent') +
        ' (:elapsed seconds)',
      clear: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  }
}
