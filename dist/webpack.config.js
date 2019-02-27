var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
module.exports = {
    devtool: 'source-map',
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                loader: 'awesome-typescript-loader',
                test: /\.(ts|tsx)$/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                loader: 'file-loader?name=[name].[ext]' // <-- retain original file name
            }
        ],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            filename: './index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
    },
};
//# sourceMappingURL=webpack.config.js.map