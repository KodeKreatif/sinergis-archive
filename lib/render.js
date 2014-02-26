/**
 * Module dependencies.
 */

var views = require ("co-views");
var path = require ("path");
var join = path.resolve;

module.exports = function (options){
  return views(join(options.dir), {
    map: { html: "swig" }
  }); 
}