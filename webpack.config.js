'use strict';

const webpack = require('webpack')

module.exports = {
    entry: "./Public/index.js",
    output: {
        path: __dirname,
        filename: "./Public/bundle.js"
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