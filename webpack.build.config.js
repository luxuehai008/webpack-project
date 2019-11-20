const path = require("path");
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const Base = require("./webpack.base.config");
const merge = require('webpack-merge');

let setPath = (pathname)=>{
  return path.resolve(__dirname,pathname)
}

const pathname = "https://special.mercedes-benz.com.cn/2019eqc/";

module.exports = merge(Base,{
  mode: "production",
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: false, //启动缓存
        parallel: true, //启动并行压缩
        sourceMap: false //如果为true的话，可以获得sourcemap
      })
    ]
  },
  plugins: [
    new ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template:setPath("src/index.ejs"),
      filename:"index.html",
      inject: true,
      pathname,
      minify:{
          removeAttributeQuotes:false,
          collapseWhitespace:true,
      }
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new CleanWebpackPlugin()
  ]
})
