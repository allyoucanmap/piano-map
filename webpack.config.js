const webpack = require('webpack');
const DefinePlugin = require("webpack/lib/DefinePlugin");

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    return {
        entry: {
            'piano-map': './index.js'
        },
        output: {
            path: __dirname + '/dist',
            publicPath: 'dist',
            filename: '[name].js',
            globalObject: 'this'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [ 'babel-loader' ]
                },
                {
                    test: /\.svelte$/,
                    exclude: /node_modules/,
                    use: 'svelte-loader'
                },
                {
                    test: /\.worker\.js$/,
                    use: { loader: 'worker-loader' }
                }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.svelte']
        },
        plugins: [
            new DefinePlugin({
                '__DEVELOPMENT__': !isProduction
            }),
            ...(
                isProduction
                ? [ ]
                : [ new webpack.HotModuleReplacementPlugin() ]
            )
        ],
        devServer: isProduction
            ? undefined
            : {
                port: 3000,
                contentBase: './',
                hot: true
            },
        devtool: isProduction ? undefined : 'eval'
    }
};
