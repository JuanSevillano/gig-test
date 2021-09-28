const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack/webpack.config');
const compiler = webpack(config);


const webpackDevInstance = webpackDevMiddleware(compiler, { publicPath: config.output.publicPath });
app.use(webpackDevInstance);


app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));


app.use(function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Serve the files on port 3000.
app.listen(3000, () => {
    console.log('Starting servin dev app in localhost:3000 \n');
});