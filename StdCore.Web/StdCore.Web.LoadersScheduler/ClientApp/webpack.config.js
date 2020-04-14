const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const autoprefixer = require('autoprefixer');
const postcssimport = require('postcss-import');
const mqpacker = require('css-mqpacker');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

let confProd = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "."
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            localsConvention: 'camelCase',
                            modules: {
                                mode: "local",
                                localIdentName: "[local]--[hash:base64:5]"
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers:['ie >= 8', 'last 4 version']
                                })
                            ],
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/, use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            localsConvention: 'camelCase',
                            modules: {
                                mode: "local",
                                localIdentName: "[local]--[hash:base64:5]"
                            }
                        }
                    },
                    {loader: 'postcss-loader', options: {plugins: [autoprefixer, postcssimport, mqpacker]}},
                    {
                        loader: 'sass-loader',
                        options: {
                            data: '@import "./src/constants.scss"; @import "./src/mixins.scss";',
                            includePaths:[__dirname, 'src']
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "/images/"
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '/fonts/'
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        minimizer: [
            new OptimizeCssAssetWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    },
    devtool: "source-map"
};

let confDev = {
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    { loader: "style-loader" },
                    {
                        loader: "css-loader",
                        options: {
                            localsConvention: 'camelCase',
                            modules: {
                                mode: "local",
                                localIdentName: "[local]--[hash:base64:5]"
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [
                    { loader: "style-loader" },
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                mode: "local",
                                localIdentName: "[local]"
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            localsConvention: 'camelCase',
                            modules: {
                                mode: "local",
                                localIdentName: "[local]--[hash:base64:5]"
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            data: '@import "./src/constants.scss"; @import "./src/mixins.scss";',
                            includePaths:[__dirname, 'src']
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "/images/"
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '/fonts/'
                        }
                    }
                ]
            }
        ]
    },
    devtool: "eval-sourcemap",
    devServer: {
        compress: true,
        contentBase: path.resolve(__dirname, "build"),
        historyApiFallback: true,
        publicPath: "/scheduler/"
    },
    plugins: [
        new CopyPlugin([
            { from: 'index-dev.html', to: 'index.html' },
        ]),
    ]
};

let confCommon = {
    entry: ["./src/index.tsx"],
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "bundle.js",
        publicPath: "/scheduler/"
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: "/node_modules/",
                use: "ts-loader"
            },
            {
                test: /\.js(x?)$/,
                exclude: "/node_modules/",
                use: "babel-loader"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            "@root": path.resolve(__dirname, "src/")
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
            ignoreOrder: false
        }),
        new CopyPlugin([
            { from: 'index.html', to: 'index.html' },
        ]),
        // new HtmlWebpackPlugin({
        //     template: "./src/index.html"
        // })
    ]
};

module.exports = function(env, options) {
    let isProduction = options.mode === "production";
    let result = {};

    if (isProduction) {
        result = merge([confCommon, confProd]);
    } else {
        result = merge([confCommon, confDev]);
    }

    console.log(result);
    return result;
};
