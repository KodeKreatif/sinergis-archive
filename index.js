var koa = require ("koa");
var http = require ("http");
var Primus = require("primus");
var sinergis = require ("./lib");
var pkg = require("./package").sinergis;

var app = koa();

sinergis.boot (app, pkg.api, pkg.app);
var server = http.createServer(app.callback());

if (pkg.primus) {
  sinergis.connect (app, new Primus(server, { transformer: pkg.primus.transformer }), pkg.api);
}

// @todo set using env var
server.listen(pkg.port); 