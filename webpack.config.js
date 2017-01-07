module.exports = {
  devtool: "source-map",   // 生成sourcemap,便于开发调试
  entry: gerEntry(),      // 获取项目入口js文件
  output: {
    path: path.join(__dirname, "dist/js/"),   // 文件输出目录
    publicPath: "dist/js/",   // 用于配置文件发布路径，如CDN或本地服务器
    filename: "[name].js",    // 根据入口文件输出对应的多个文件名
  },
  module: {
    //各种加载器，即让各种文件格式可用require引用
    loaders: [
			{
        test: /\.js$/,
        loader: "babel",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      }, {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader",
      },
      {
				test: /\.(png|jpe?g|gif)(\?.*)?$/,
				loader: 'url',
				query: {
					limit: 5000,
					name: 'images/[name].[ext]?[hash:10]'
				}
			},
    ],
  },
  resolve: {
    //配置别名，在项目中可缩减引用路径
    alias: {
      lib: "../../js/lib",
    },
  },
  plugins: [
    //将公共代码抽离出来合并为一个文件
    new CommonsChunkPlugin('common.js'),
    // js文件压缩
    new uglifyJsPlugin({
      compress: {
        warnings: false
      },
    }),
  ],
  devtool: 'source-map',
};
