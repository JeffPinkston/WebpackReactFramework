var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build'),
	test: path.join(__dirname, 'tests')
}

process.env.BABEL_ENV = TARGET;

const common = {
	entry: PATHS.app,
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		preLoaders: [
			{
				test: /\.jsx?$/,
				loaders: ['eslint-loader'],
				include: PATHS.app
			}
		],	
		loaders: [
			{
				test: /\.css$/,
				loaders: ['style', 'css'],
				include: PATHS.app
			},
			{
				test: /\.jsx?$/,
				loaders: ['babel'],
				include: PATHS.app
			}
		]
	},
	
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	},
	plugins: [
		new HtmlwebpackPlugin({
			template: 'node_modules/html-webpack-template/index.html',
			title: 'Kanban app',
			appMountId: 'app'
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

if(TARGET === 'test' || TARGET === 'tdd'){
	module.exports = merge(common, {
		entry: {}, //karme will set this
		output: {}, //karma will set this
		devtool: 'inline-source-map',
		resolve: {
			alias: {
				'app': PATHS.app
			}
		},
		module: {
			preLoaders: [
				{
					test: /\.jsx?$/,
					loaders: ['isparta-instrumenter'],
					include: PATHS.app
				}
			],
			loaders: [
				{
					test: /\.jsx?$/,
					loaders: ['babel?cacheDirectory'],
					include: PATHS.test
				}
			]
		}
	});
}