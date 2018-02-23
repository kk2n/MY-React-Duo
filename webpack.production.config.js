/*
说明：本例为webpack3的配置样例
=======================================
webpack3.webpack2.*已经内置可处理JSON文件
全局安装
npm install -g webpack
npm install -g json-server
端口在package.json文件中的script语句中设置
*/
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //使用模板
const UglifyJSPlugin = require("uglifyjs-webpack-plugin"); //压缩js代码
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //css外置
const getEntry = require("./entry.config");
const pathConfig = require("./path.config");
const _ = require("lodash");
// 多入口，文件数组

//文件路径的\\和/跟操作系统也有关系，需要注意
let entrys = getEntry("app/**/*.entry.js", "app\\", 'entry');

//多文件修改模板插件
let HtmlPlugin = _.map(entrys, (val, key) => {
    let wen = key.substring(key.lastIndexOf('/') + 1);//文件名;
    return new HtmlWebpackPlugin({
        filename: key + ".html", //模板输出html
        template: entrys[key].replace("entry.js", "index.html").replace(wen + '.', ""), //模板
        inject: true,
        chunks: [key, 'common'],
        favicon: '',
        hash: '[hash:7]',
    })
});
//添加公共代码提取
HtmlPlugin.push(
    new webpack.optimize.CommonsChunkPlugin({
        name: ['common'], // 注意不要.js后缀
        filename: 'common/comm-[name].js',
        minChunks: 2//import级别
    })
);
console.log(HtmlPlugin);
//加入第三方库，不参与压缩

// path参数其实是针对本地文件系统的
//publicPath则针对的是浏览器
module.exports = {
    // 入口文件
    entry: entrys,
    externals:{
        'comm':'./public/common/comm.js',
    },
    output: {
        path: __dirname + "/dist", //js输出路径
        filename: "common/[name].js" //js输出文件
    },
    //map
    devtool: "source-map",
    //编译模块
    module: {
        //规则
        rules: [
            //编译css，less,不分离
            {
                test: /(\.less)/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader?minimize&-autoprefixer!less-loader"] //css压缩
                })
            },
            //编译css，scss,不分离
            {
                test: /(\.css|\.scss)/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader?minimize&-autoprefixer!sass-loader"] //css压缩
                })
            },
            //字体打包
            {
                test: /\.(eot|svg|ttf|woff|woff2)\w*/,
                loader: 'url-loader?limit=1000000'
            },
            //图片
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=img/[name].[ext]'
            },
            //编译js和jsx
            {
                //匹配文件
                test: /(\.jsx|\.js)$/,
                //编译器
                use: {
                    loader: "babel-loader"
                },
                //排除项
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        //版权
        new webpack.BannerPlugin("By LiKuan@Yishengya 版权所有，翻版必究"),
        //css独立输出
        new ExtractTextPlugin({
            filename: "common/[name].css"
        }),
        //服务器模块热 替换
        new webpack.HotModuleReplacementPlugin(),
        // 提供公共代码
        //为组件分配ID,@发布
        new webpack.optimize.OccurrenceOrderPlugin(),
        //压缩js,@发布
        new UglifyJSPlugin(),
    ].concat(HtmlPlugin),
    //
    resolve: {
        //查找module的话从这里开始查找
        //root: 'd:/github/flux-example/src', //绝对路径
        // root:[
        //     path.resolve('./app/modules')
        // ],
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['.js','.jsx','.json'],
        // 配置别名
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            //JsxTools : './app/comm-util/jsxTools.js',//后续直接 require('AppStore') 即可
        }
    }
};
