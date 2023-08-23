const { defineConfig } = require("cypress");
const webpackPreprocessor = require("@cypress/webpack-preprocessor");
const webpack = require("webpack");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    setupNodeEvents(on, config) {
      const webpackOptions = {
        resolve: {
          fallback: {
            zlib: false,
            fs: false,
            path: false,
            querystring: false,
            url: require.resolve("url"),
            stream: require.resolve("stream-browserify"),
            buffer: require.resolve("buffer"),
          },
        },
        experiments: {
          asyncWebAssembly: true,
        },
        plugins: [
          new webpack.ProvidePlugin({ process: "process/browser" }),
          new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
          })
        ]
      }
      on('file:preprocessor', webpackPreprocessor({ webpackOptions }))
      return config
    },
  },
});


