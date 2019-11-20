const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


let setPath = (pathname)=>{
    return path.resolve(__dirname,pathname)
}

module.exports = {
    entry: setPath("src/common/js/index.js"),
    output:{
        path: setPath("build"),
        filename:"common/js/budle.[name].[hash:6].js"
    },
    resolve:{
        extensions:[".js",".css",".less",".json"]
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            use: "babel-loader",
            exclude: /node_modules/
          },
          {
            test: /\.(htm|html)$/i,
            loader: 'html-withimg-loader'
          },
          {
            test: /\.ejs$/i,
            loader: 'underscore-template-loader'
          },
          {
            test: /\.css/,
            use:[
                {
                loader: MiniCssExtractPlugin.loader,
                  options:{
                    publicPath: '../../'
                  }
                },
                "css-loader",
                "postcss-loader"
              ]
          },
          {
            test: /\.less/,
            use:[MiniCssExtractPlugin.loader,"css-loader","less-loader","postcss-loader"]
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            use:{
              loader:"url-loader",
              options:{
                limit:1024,
                name:"[name].[hash:6].[ext]",
                outputPath:"common/images/", //图片都生成到img文件夹下
                //publicPath:"../images", //给图片单独加cdn
              }
            }
          },
          {//处理字体
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use:{
            loader:"url-loader",
            options:{
                limit:1024*10,
                name:"[name].[ext]",
                outputPath:"common/fonts/",
                publicPath:"../fonts/",
              }
            }
          }
        ]
      },
    plugins:[
          new MiniCssExtractPlugin({
            filename:"common/css/[name].[hash:6].css" //生成到css文件夹下
          }),
        new CopyWebpackPlugin([
            {
              from:"./src/common/video",
              to:"./common/video"
            },
            {
              from:"./src/common/js/plugin",
              to:"./common/js/plugin"
            },
            {
              from:"./src/common/css/swiper-3.4.2.min.css",
              to:"./common/css/swiper-3.4.2.min.css"
            }
        ])
    ]

}