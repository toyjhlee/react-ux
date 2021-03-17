const path = require('path')

module.exports = {
  //   entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      //   {
      //     test: /\.jsx?$/,
      //     exclude: /node_modules/,
      //     loader: 'babel-loader',
      //   },
      //   // Other loaders that are needed for your components
      //   {
      //     test: /\.css$/,
      //     use: [
      //       "style-loader",
      //       {
      //         loader: "css-loader",
      //         options: {
      //           importLoaders: 1,
      //           modules: true,
      //         },
      //       },
      //     ],
      //   },
    ],
  },
  //   resolve: {
  //     extensions: ['.tsx', '.ts', '.js'],
  //   },
  //   output: {
  //     filename: 'bundle.js',
  //     path: path.resolve(__dirname, 'dist'),
  //   },
}
