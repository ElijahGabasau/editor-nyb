const { createProxyMiddleware } = require('http-proxy-middleware');

//development proxy to bound react dev server to node.js server
module.exports = function(app) {
    app.use( 
        '/.netlify/functions/',
        createProxyMiddleware({
        target: 'http://localhost:9000/',
        changeOrigin: true,
        })
    )
}