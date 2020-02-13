const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const buildOpts =
  process.env.NODE_ENV === 'production'
    ? { mode: 'production', devtool: false }
    : { mode: 'development', devtool: 'inline-source-map' }

module.exports = {
  mode: buildOpts.mode,
  devtool: buildOpts.devtool,
  devServer: {
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: true,
      assets: true,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: false,
      warnings: false,
      publicPath: false,
      progress: true,
      inline: true
    }
   },
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    library: '',
  },
  plugins: [new HtmlWebpackPlugin({
    template: './public/index.html'
  })],
  resolve: {
    // also resolve .js as not all package in node_modules have typings installed
    extensions: ['.tsx', '.ts', '.js'],
    // need to resolve root node_modules and local node_modules
    modules: [path.join(__dirname, '../../node_modules'), 'node_modules']
  },
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
          }
        ]
      }
    ]
  }
}
