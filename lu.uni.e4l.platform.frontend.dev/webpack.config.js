const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
var combineLoaders = require('webpack-combine-loaders');
const Dotenv = require('dotenv-webpack');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
    return {
        entry: ["./src/js/index.js"],
        output: {
            path: path.resolve(__dirname, "e4l.frontend/web/dist"),
            filename: "js/[name].js",
            publicPath: env.PUBLIC_PATH,
        },
        devServer: {
            contentBase: "./dist",
            historyApiFallback: {
                disableDotRule: true
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                    query: {
                        plugins: ['transform-class-properties']
                    }
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader"
                        }
                    ]
                },
                {

                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']

                },
                {
                    test: /\.scss$/,
                    use: [{
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "sass-loader" // compiles Sass to CSS
                    }]
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loader: 'file-loader',
                    options: {
                        name: 'public/img/[name].[ext]'
                    }
                }
            ]
        },
        plugins: [
            // new ExtractTextPlugin('styles.css'),
            new HtmlWebPackPlugin({
                template: "./src/index.html",
                filename: "./index.html"
            }),
            new Dotenv()
        ]
    }
};
