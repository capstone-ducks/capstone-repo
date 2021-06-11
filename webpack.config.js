const path = require("path");
const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");


const webpackConfig = {
    entry: {
        path: path.join(__dirname, "./client/index.jsx"),
    },
    output: {
        path: path.join(__dirname, "./public/dist"),
        filename: "main.js",
    },
    devtool: "eval-cheap-source-map",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                },
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-react"],
                },
            },
            // {
            //     test: /\.js$/,
            //     enforce: "pre",
            //     use: ["source-map-loader"],
            // },
        ],
    },
    resolve: {
        fallback: {
          "http": require.resolve("stream-http")
        }
      },
    plugins: [
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
        new NodePolyfillPlugin()
    ],
};

module.exports = webpackConfig;
