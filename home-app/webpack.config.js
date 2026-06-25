const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require(
  "webpack/lib/container/ModuleFederationPlugin"
);

const dependencies = require("./package.json").dependencies;

const headerAppRemoteUrl =
  process.env.VITE_HEADER_REMOTE_URL ||
  "http://localhost:3000/remoteEntry.js";

module.exports = {
  mode: "development",

  entry: "./src/index.js",

  output: {
    publicPath: "auto",
    uniqueName: "homeApp",
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),

    new ModuleFederationPlugin({
      name: "homeApp",

      remotes: {
        headerApp: `headerApp@${headerAppRemoteUrl}`,
      },

      shared: {
        react: {
          singleton: true,
          requiredVersion: dependencies.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
      },
    }),
  ],

  devServer: {
    port: 3001,
    historyApiFallback: true,

    hot: false,
    liveReload: true,
  },
};
