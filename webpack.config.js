const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  devtool: 'inline-source-map',
  devServer: {
  	contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
          // options: {
          //   presets: [
          //     '@babel/preset-env', 
          //     '@babel/preset-react',
          //     {
          //       plugins: ['@babel/plugin-proposal-class-properties']
          //     } 
          //   ]
          // }
        }
      },
      {
      	test: /\.css$/,
      	use: [
      		'style-loader',
      		'css-loader'
      	]	
      },
      {
        test: /\.scss$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {
            loader: "sass-loader",
            options: {
              implementation: require('sass')
            }
          }
        ]
      },
      {
				test: /\.(png|svg|jpg|gif)$/,
				use: [
				 'file-loader'
				]
			},
			{
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      SITE_TRANSITION_DURATION: '5'
    })
  ],
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};