const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    // app.use('/fbi', createProxyMiddleware({ target: 'http://10.10.100.16:8081', changeOrigin: true }));
    app.use('/fbi', createProxyMiddleware({ target: 'https://www.turbox.io/', changeOrigin: true }));
};