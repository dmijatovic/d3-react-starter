//const webpack = require('webpack');
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 */
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const dist = path.resolve(__dirname, '../dist')

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: dist
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [
          //extract css into separate file
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
              name: 'img/[name].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    //remove all files from dist folder on each build
    new CleanWebpackPlugin([dist]),
    //copy index html
    //https://webpack.js.org/plugins/html-webpack-plugin/
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    //extract css to separate file
    //https://webpack.js.org/plugins/mini-css-extract-plugin/
    new MiniCssExtractPlugin({
      // Options similar to webpackOptions.output
      // both options are optional
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].[chunkhash].css'
    }),
    //copy assets
    //https://webpack.js.org/plugins/copy-webpack-plugin/
    new CopyWebpackPlugin([
      //copy all files from assets dir to root
      './static/'
    ]),
    //uglify js
    new UglifyJSPlugin(),
    //optimize css
    new OptimizeCSSAssetsPlugin(),
    /* further investigation needed
			https://www.npmjs.com/package/webpack-bundle-analyzer
		*/
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle_report.html'
      //generateStatsFile: true
    })
  ],

  /*
		optimizing bundels
		https://webpack.js.org/configuration/optimization/
	*/
  optimization: {
    /*
     * SplitChunksPlugin is enabled by default and replaces
     * deprecated CommonsChunkPlugin.
     * Default configuration has 3 options: all, async or inital
     * more info https://webpack.js.org/plugins/split-chunks-plugin/
     */
    splitChunks: {
      // min size 30KB
      minSize: 30000,
      //max size 1MB
      maxSize: 1000000,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all'
        }
        /* extract react & react-dom
        vendor: {
          name: 'react',
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          chunks: 'all'
        }*/
      }
    }
  }
}
