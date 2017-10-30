var path = require('path');
var webpack = require('webpack');


module.exports = {
    entry: './source/react-main.js',
    output: {path: __dirname + '/public/javascripts', filename: 'bundle.js'},
    plugins: [
        new webpack.ProvidePlugin({
            "React": "react",
        }),
    ],
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {presets: ['env', 'react']}
            }
        ]
    },
    devtool: "source-map"
};