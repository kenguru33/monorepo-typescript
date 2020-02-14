const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const path = require('path')
const buildOpts =
  process.env.NODE_ENV === 'production'
    ? { mode: 'production', devtool: false }
    : { mode: 'development', devtool: 'inline-source-map' }

module.exports = {
  mode: buildOpts.mode,
  devtool: buildOpts.devtool,
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    library: ''
  },
  stats: true,
  devServer: {
    noInfo: true
  },
  resolve: {
    // also resolve .js as not all package in node_modules have typings installed
    extensions: ['.tsx', '.ts', '.js'],
    // need to resolve root node_modules and local node_modules
    modules: [path.join(__dirname, '../../node_modules'), 'node_modules']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
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
        use: 'ts-loader',
        exclude: /node_modules/
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
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name]-[hash].[ext]'
            }
          }
        ]
      }
    ]
  }
}
