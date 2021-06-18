const {
  when,
  whenDev,
  whenProd,
  whenTest,
  ESLINT_MODES,
  POSTCSS_MODES,
} = require("@craco/craco");
const path = require("path");
const CracoLessPlugin = require("craco-less");

const pathResolve = pathUrl => path.join(__dirname, pathUrl);

const uiTheme = {
  '@base-color': '#0260FF' ,
  '@font-family-base': 'Alphakind',
  '@B800': '#0E1427'
}

module.exports = {
  plugins: [
    { 
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: { 
            javascriptEnabled: true ,
            modifyVars: uiTheme
          },
        },
      }
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: { 
            javascriptEnabled: true ,
            modifyVars: uiTheme
          },
        },
        modifyLessRule: function () {
          return {
            test: /\.(module)\.(less)$/,
            exclude: /node_modules/,
            use: [
              { loader: "style-loader" },
              {
                loader: "css-loader",
                options: {
                  modules: {
                    localIdentName: "[local]_[hash:base64:6]",
                  },
                },
              },
              { loader: "less-loader" },
            ],
          };
        },
      },
    },
  ],
  webpack: {
    alias: {
      "@@": pathResolve("."),
      "@": pathResolve("src"),
      "@assets": pathResolve("src/assets"),
      "@common": pathResolve("src/common"),
      "@components": pathResolve("src/components"),
      "@hooks": pathResolve("src/hooks"),
      "@pages": pathResolve("src/pages"),
      "@store": pathResolve("src/store"),
      "@utils": pathResolve("src/utils"),
      "@config": pathResolve("src/config"),
      "@http": pathResolve("src/http"),
    },
  },
};
