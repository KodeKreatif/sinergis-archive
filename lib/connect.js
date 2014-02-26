var path = require ("path");
var fs = require ("fs");

var join = path.resolve;
var readdir = fs.readdirSync;
var env = process.env.NODE_ENV || "development";

module.exports = function(app, primus, root){

  readdir(root).forEach(function(file){
    var dir = join(root, file);
    var conf = require(dir + "/config.json");
    conf.name = file;
    conf.directory = dir;

    if (conf.type == "primus") {
      var mod = require(conf.directory) (primus, env);
    }

    // @todo if production, we should save the primus minified lib somewhere, it should be updated whenever the configuration is changed, e.g. transformer is changed

  });
}