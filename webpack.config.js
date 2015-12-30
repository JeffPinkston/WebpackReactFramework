var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
}

const common = {
	module: {
		loaders: [{
			test: /\.css$/,
			loaders: ['style', 'css'],
			include: PATHS.app
		}]
	},
	entry: PATHS.app,
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	},
	plugins: [
		new HtmlwebpackPlugin({
			title: 'Kanban app'
		})
	]
};

if(TARGET === 'start' || !TARGET){
	module.exports = merge(common, {
		devtool: 'eval-source-map',
		devServer: {
			historyApiFallback: true,
			hot: true,
			inline: true,
			progress: true,

			//display only errors to reduce the amount of output.
			stats: 'errors-only',

			//Parse host and port from env for easy customization
			host: process.env.HOST,
			port: process.env.PORT
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		]
		
	});
}

if(TARGET === 'build'){
	module.exports = merge(common, {});
}