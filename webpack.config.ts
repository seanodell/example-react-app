import fs from 'fs';
import webpack from 'webpack';
import CopyPlugin from "copy-webpack-plugin";

import { webpack_proxy } from './src/webpack-proxy';

const pages = fs.readdirSync(__dirname + '/src/pages')
  .filter(page => fs.statSync(__dirname + '/src/pages/' + page).isDirectory());
pages.push(".");

const config: webpack.Configuration = {
  devtool: "source-map",
  entry:
    pages.reduce((map, page) => {
      map[page] = __dirname + `/src/pages/${page}/index.tsx`;
      return map;
    }, {} as webpack.Entry),
  output: {
    filename: "[name]/index.js",
    path: __dirname + "/dist/pages"
  },
  devServer: {
    publicPath: '/pages/',
    compress: true,
    port: 9000,
    before: webpack_proxy
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: ["src", "node_modules"]
  },
  plugins: [
    new CopyPlugin(pages.map((page) => {
      return { from: __dirname + '/src/boilerplates/index.html', to: __dirname + `/dist/pages/${page}/index.html` };
    }))
  ],
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};

export default config;
