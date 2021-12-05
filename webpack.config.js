const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const {DefinePlugin} = require('webpack');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
    },
    devtool: 'source-map',
    resolve: {
        modules: [path.join(__dirname, 'src'), 'node_modules'],
        alias: {
            '@': path.join(__dirname, './src'),
            react: path.join(__dirname, 'node_modules', 'react'),
        },
        extensions: ['.js', '.jsx', '.css', '.scss'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                use: ['file-loader?name=[name].[ext]']
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico'
        }),
        new DefinePlugin({
            REACT_APP_SERVER_URL: '\'https://hacker-news.firebaseio.com/v0\'',
        }),
    ],
};
