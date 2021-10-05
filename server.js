const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');

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
    const dir = path.resolve(__dirname, 'public', 'index.html')
    res.sendFile(dir);
});

app.get('*', function (req, res) {
    const dir = path.resolve(__dirname, 'src', './index.tsx')
    res.redirect(dir);
});


const dir = path.resolve(__dirname, 'public', 'index.html')
app.use(express.static(dir));

// Serve the files on port 3000.
app.listen(3000, () => {
    console.log('Starting servin dev app in localhost:3000 \n');
});