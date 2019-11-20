const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const pathname = "https://special-daimler-qa.mcongroup.cn/2019eqc/";
const Base = require("./webpack.base.config");
const merge = require('webpack-merge');
let setPath = (pathname)=>{
  return path.resolve(__dirname,pathname)
}

module.exports = merge(Base,{
  mode: "development",
  devServer:{
    host:"localhost",
    port:"88",
    contentBase: setPath('build'),
    hot:true
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:setPath("src/index.ejs"),
      filename:"index.html",
      pathname
    }),
  ]
})
