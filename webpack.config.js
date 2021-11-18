const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
	entry       : './src/index.js',
	output      : {
		path    : path.resolve(__dirname, 'dist'),
		filename: 'main.js'
	},
	module      : {
		rules: [
			{
				test: /\.html$/,
				use : [
					{
						loader : 'html-loader',
						options: {
							minimize: true
						}
					}
				]
			}, {
				test   : /\.js$/,
				exclude: /node_modules/,
				use    : ['babel-loader'],
			}, {
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type:
					'asset/resource',
			}, {
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type:
					'asset/inline',
			}, {
				test: /.(s[ac]ss)$/i,
				use : [
					MiniCssExtractPlugin.loader,
					{
						loader : 'css-loader',
					},
					'postcss-loader',
					'sass-loader',
					{
						loader : 'sass-resources-loader',
						options: {
							resources: [
								'src/styles/vars.scss'
							]
						}
					},
				]
			}, {
				test: /\.css$/,
				use : [
					MiniCssExtractPlugin.loader, 'css-loader'
				]
			}
		]
	},
	plugins     : [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html'
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
	],
	optimization: {
		minimize: true,
	},
	mode        : 'development',
	devServer   : {
		historyApiFallback: true,
		open              : true,
		compress          : true,
		hot               : true,
		port              : 8080,
	},
}