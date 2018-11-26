var DashboardPlugin = require('webpack-dashboard/plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const num = 'main2'; //不同案例编号 每次修改 修改入口函数 根据入口.js 生成不同文件夹
module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + "/src/"+num+".js",
    output: {
        path: __dirname + "/public/"+num,
        filename: num+".js"
    },
    devServer: {
        contentBase: "./public",
        historyApiFallback: true,
        inline: true
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader"
            },
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }]
        },{
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=819200&name=images/[hash:8].[name].[ext]' //小于800k 转成 base64 码 8192=8k
        },{
            test: /\.(obj|ply)$/,
            loader: 'url-loader?limit=8192&name=mod/[hash:8].[name].[ext]'
        }
        
    ]
    },
    plugins: [
        new DashboardPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: './index.html' //使用模板 必须有模板文件
        })
    ]



}