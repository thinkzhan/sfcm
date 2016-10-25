var koa = require('koa');
var serve = require('koa-static');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var path = require('path');
var fileserver = require('./fileserver');
var console = require('sfconsole')("START");

module.exports = {
  run: function (config) {
    console.info("start...");
    var port = config.port;
    var app = koa();
    app.use(fileserver());
    app.use(serve('.'));
    app.listen(port, function () {
      open('http://127.0.0.1:' + port);
    });
    console.info(('Server started at http://127.0.0.1:' + port));

    function open(url) {
      switch (process.platform) {
      case "darwin":
        exec('open ' + url);
        break;
      case "win32":
        exec('start ' + url);
        break;
      default:
        spawn('xdg-open', [url]);
      }
    };
  }
}