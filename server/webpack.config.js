const webpack = require("webpack")
const path = require("path")

const DEBUG = !process.argv.includes("--release")

console.log(`[Webpack] running in ${DEBUG ? "debug" : "production"} mode.`)

module.exports = {
	
  entry: path.join(__dirname, "src"),

  target: "node",

  watch: DEBUG,

  externals: [
    (context, request, cb) => {
      cb(null, Boolean(request.match(/^[@a-z][a-z\/\.\-0-9]*$/i)))
    },
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },

  output: {
    filename: "./dist/server.js",
    libraryTarget: "commonjs2", // transpiles es6 exports to module.exports
  },

  module: {
    loaders: [{
      test: /\.js$/,
	  exclude: /node_modules/,
      loader: "babel-loader",
      query: {
        presets: ["es2015"]
      }
    }, {
      test: /\.json$/,
      loader: "json-loader"
    }],

    resolve: {
      root: path.resolve(__dirname, "./src"),
      modulesDirectories: ["node_modules"],
      extensions: ["", ".webpack.js", ".web.js", ".js", ".json"],
    },
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({compress: true, mangle: true}),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ]
}
