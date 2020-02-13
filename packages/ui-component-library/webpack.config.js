const nodeExternals = require('webpack-node-externals')
const path = require('path')
console.log('Evironment:', process.env.NODE_ENV)
const buildOpts =
  process.env.NODE_ENV === 'production'
    ? { mode: 'production', devtool: false }
    : { mode: 'none', devtool: 'inline-source-map' }
module.exports = {
  mode: buildOpts.mode,
  devtool: buildOpts.devtool,
  devServer: {
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: false,
      errorDetails: false,
      warnings: false,
      publicPath: false
    }
  },
  entry: path.resolve(__dirname, './src/index.ts'),
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
