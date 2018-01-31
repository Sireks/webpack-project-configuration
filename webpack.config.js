'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackVersionPlugin = require('webpack-version-plugin');
const versionConfig = require(path.join(__dirname, './version-manifest.json'));

const Path = {
    assets: path.join(__dirname, 'assets'),
    public: path.join(__dirname, 'public')
};

const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
    entry: {
        main: Path.assets + '/js/main.js'
    },
    output: {
        path: Path.public,
        filename: './js/[name].js',
        publicPath: Path.public
    },

    devtool: (NODE_ENV == 'development') ? 'inline-cheap-module-source-map' : false,

    watchOptions: {
        aggregateTimeout: 100
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    // use: ['css-loader', 'autoprefixer-loader?safe=true', 'sass-loader']
                    use: ['css-loader', 'autoprefixer-loader', 'sass-loader']
                })
            }
        ]
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('./css/main.css')
    ]
};

if(NODE_ENV == 'production') {
    config.plugins.push(
        new WebpackVersionPlugin({
            cb: function(hashMap) {
                versionConfig.vendorJsVersion = hashMap.hash;
                fs.writeFileSync(path.join(__dirname, './version-manifest.json'), JSON.stringify(versionConfig, null, 2));
            }
        }),
        new CopyWebpackPlugin([
            {
                from: './assets/js/vendor/*',
                to: './js/vendor',
                flatten: true
            }
        ]),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}

module.exports = config;