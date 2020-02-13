const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
  mode: 'development',
  devtool: 'source-map',
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
