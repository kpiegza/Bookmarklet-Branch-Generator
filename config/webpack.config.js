const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bookmarklet-bundled.js',
    // IIFE output - bez module system
    iife: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 5,
          compress: {
            passes: 2,
            drop_console: false,
          },
          mangle: true,
          output: {
            comments: false,
            ecma: 5,
          },
        },
      }),
    ],
  },
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    ie: '11',
                  },
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
