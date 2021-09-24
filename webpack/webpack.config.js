const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', path.resolve(__dirname, '..', 'src/index.tsx')],
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', 'public/index.html'),
            filename: "index.html",
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, '..', 'build'),
        clean: true,
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts|js)?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.css$/,
                use: 'typings-for-css-modules-loader?modules&namedExport&camelCase'
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
            },
            {
                test: /\.html$/,
                use: ["html-loader"],
            },
        ],
    },
}