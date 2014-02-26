var Router = require ("koa-router");

var papers = new Router();
var Readable = require('stream').Readable;

papers.get ("/papers", 
  function *(next) {
    this.papers = ["a", "b", "c"]; 
    yield next;
  },
  function *(next) {
    this.body = this.papers;
  }
);

papers.get ("/papers/stream", function *(){

  // sse example
  // curl localhost:port/papers/stream
  this.sse(objectStream());
});

/**
 * Stream utility.
 */

function objectStream(){
  var stream = new Readable({ objectMode: true });
  var i = 0;
  stream._read = function(){
    this.push({
      foo: ++i
    });
    if (i == 3) this.push(null);
  }
  return stream;
}


module.exports = papers;