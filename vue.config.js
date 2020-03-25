/**
 * *@2019-11-07
 * *@author yqf
 * *@describe vue-cli 3.x配置文件
 */

const CompressionPlugin = require('compression-webpack-plugin'); //开启Gzip
const yml = require("js-yaml");
const fs = require("fs");
const {config}= yml.safeLoad(fs.readFileSync("./_config.yml", "utf-8"));


config["configureWebpack"] =()=>{
  if (process.env.NODE_ENV === 'production') {
    return {
      plugins: [
        new CompressionPlugin({
          test: /\.js$|\.html$|.\css/, //匹配文件名
          threshold: 10240,//对超过10k的数据压缩
          deleteOriginalAssets: false //不删除源文件
        })
      ]
    }
  }
};
module.exports = config;
