const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require("@craco/craco");
const path = require('path');
const CracoLessPlugin = require("craco-less");

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: { javascriptEnabled: true },
                },
                modifyLessRule: function () {
                    return {
                        test: /\.module\.less$/,
                        exclude: /node_modules/,
                        use: [
                            { loader: 'style-loader' },
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: {
                                        localIdentName: '[local]_[hash:base64:6]',
                                    },
                                },
                            },
                            { loader: 'less-loader' },
                        ],
                    };
                },
            },
        }
    ]
};