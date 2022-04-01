const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// const process = require('process');

const prefix = process.env.PHASER_ENV === 'dev' ? '' : 'hello-world/';

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        port: 8080,
        contentBase: path.resolve(__dirname, '../src/assets'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: [/\.vert$/, /\.frag$/],
                use: 'raw-loader',
            },
            {
                test: /\.(gif|png|jpe?g|svg|xml)$/i,
                use: 'file-loader',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            root: path.resolve(__dirname, '../'),
        }),
        new CopyPlugin({
            patterns: [{ from: 'src/assets', to: `${prefix}assets` }],
        }),
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true),
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
    ],
};
