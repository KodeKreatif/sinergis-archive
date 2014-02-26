
/**
 * Module dependencies.
 */

var debug = require ("debug")("api");
var compress = require("koa-compress");
var router = require ("koa-router");
var mount = require ("koa-mount");
var logger = require('koa-logger');
var error = require ("koa-error");
var jwt = require ("koa-jwt");
var path = require ("path");
var koa = require ("koa");
var fs = require ("fs");

var join = path.resolve;
var readdir = fs.readdirSync;
var env = process.env.NODE_ENV || "development";

/**
 * Load resources in `root` directory.
 *
 * @param {Object} options
 * @api private
 */

module.exports = function(options){

  var app = koa();

  if (env == "development") {
    app.use(logger());  
  }
  
  // set koa compress
  app.use(compress());

  // set error handler
  app.use(error());

  // set jwt 
  // app.use(jwt({ secret : "secret"}));

  // set router
  app.use(router(app));
  
  // build routes and resources
  readdir(options.root).forEach(function(file){
    var dir = join(options.root, file);
    var conf = require(dir + "/config.json");
    conf.name = file;
    conf.directory = dir;

    if (conf.routes) {
      route(app, conf);
    } else {
      resource(app, conf);
    }

  });

  app.on("error", function(err){
    console.log('sent error %s to the cloud', err.message);
  });

  app.listen(options.port);

};

/**
 * Define routes in `conf`.
 */

function route(app, conf) {
  debug("routes: %s", conf.name);

  var mod = require(conf.directory);

  for (var key in conf.routes) {
    var prop = conf.routes[key];
    var method = key.split(" ")[0];
    var path = key.split(" ")[1];
    debug("%s %s -> .%s", method, path, prop);

    var fn = mod[prop];
    if (!fn) throw new Error(conf.name + ": exports." + prop + " is not defined");

    // https://github.com/alexmingoia/koa-router
    // @todo handle composition, leverage multiple routers (https://github.com/alexmingoia/koa-router#multiple-routers)
    app[method.toLowerCase()](path, fn);
  }
}

/**
 * Define resource or router in `conf`.
 */

function resource(app, conf) {
  if (!conf.name) throw new Error(".name in " + conf.directory + "/config.json is required");
  debug("resource: %s", conf.name);

  var mod = require(conf.directory);
  app.use (mod.middleware());
}