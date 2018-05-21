const path = require('path');
const autoprefixer = require('autoprefixer');
const flexbugs = require('postcss-flexbugs-fixes');
const px2rem = require('postcss-px2rem');


module.exports = {
  mode: 'development',
  watch: true,
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].bundle.js'
  },
  module: {
    rules: [{
        test: /\.css$/,
        include: [
          path.resolve(__dirname, "src/css"),
        ],
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            // root: '.'
          }
        }]
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, "src/test"),
        ],
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            root: '.'
          }
        }, {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: () => [
              flexbugs,
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
              }),
              px2rem({
                remUnit: 75
              })
            ],
          }
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {}
        }]
      }
    ]
  }
}