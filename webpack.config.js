const path = require('path');

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  output: {
		filename: 'js/[name].js',
		chunkFilename: 'js/[id].js?[hash]',
		sourceMapFilename: 'js/[name].js.map',
	},
  resolve: {
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'src': resolve('src'),
      'sass': resolve('src/sass'),
      'img': resolve('src/img'),
      'components': resolve('src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')],
        options: {
          presets: ["es2015", "stage-2"],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.scss$/,
        use: [ "style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: [ "style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  devtool: 'source-map',
};
