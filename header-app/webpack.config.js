const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const dependencies = require('./package.json').dependencies;

module.exports = {
    mode: 'development',

    entry: './src/index.js',

    output: {
        publicPath: "auto",
        uniqueName: 'headerApp',
    },
    resolve: {
        extensions: ['.jsx', '.js'],
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            ['@babel/preset-react', { runtime: 'automatic' }],
                        ],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
        
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),

        new ModuleFederationPlugin({
            name: 'headerApp',
            filename: 'remoteEntry.js',
            exposes: {
                './Header': './src/Header.jsx',
            },
            shared: {
                react: {
                    singleton: true,
                    requiredVersion: dependencies.react,
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: dependencies['react-dom'],
                },
            },
        }),
    ],
    devServer: {
        port: 3000,
        historyApiFallback: true,

        hot: false,
        liveReload: true,

        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
};
