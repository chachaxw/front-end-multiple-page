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
    loaders: []
  },
  resolve: {},
  plugins: []
};
