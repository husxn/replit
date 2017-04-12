'use strict';

const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: "./src/indexLocal.js",
    output: {
        path: path.join(__dirname, 'src'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
        {
            test: /.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015'],
            },
        },
        {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        }
        ,{
            test: /.html$/,
            loader: 'html-loader',
            query: {
                minimize: true
            }
        }
        ]
    }
};