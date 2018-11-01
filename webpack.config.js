var DashboardPlugin = require('webpack-dashboard/plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + "/src/main.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
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
            loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
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