var config = {
   entry: './src/Kanbanboard.js',
	
   output: {
      path:__dirname,
      filename: 'main.js',
   },
	
   devServer: {
      inline: true,
      port: 8080,
	  historyApiFallback: true
   },
	node: {
	  fs: "empty"
	},	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['es2015', 'react']
            }
         },
		 {
			test: /\.css$/,
			include: __dirname + '/src'
		 }
      ]
   }
}

module.exports = config;