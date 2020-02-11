const nodeExternals = require('webpack-node-externals')
const path = require('path')
module.exports = {
  mode: 'none',
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    library: '',
    // umd for support of commonjs and amd package
    libraryTarget: 'umd'
  },
  // dont bundle packages listed in package.json
  externals: [nodeExternals({
      modulesFromFile: true
  })],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
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
