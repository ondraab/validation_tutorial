const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
module.exports = {
    devtool: 'source-map',
    entry: './src/index.tsx',
    module: {
        rules: [
            { test: /\.tsx?$/,
              loader: "ts-loader"
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ],
            },
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                loader: 'file-loader?name=[name].[ext]'  // <-- retain original file name
            }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            filename: './index.html'
        })
    ],
    devServer: {
        historyApiFallback: true
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
    },
};