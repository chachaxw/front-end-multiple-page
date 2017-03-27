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
    extensions: ['.js', '.vue', '.json'],
    modules: [
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, 'node_modules')
    ],
    alias: {
      'components': path.resolve(__dirname, './src/components/')
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
        exclude: /node_modules/,
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
