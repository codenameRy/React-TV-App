const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            // target: 'http://localhost:5000',
            target: 'https://warm-garden-11318.herokuapp.com', 
            changeOrigin: true,
        })
    );
};