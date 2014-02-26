var Router = require ("koa-router");

var papers = new Router();

papers.get("/papers", 
  function *(next) {
    this.papers = ["a", "b", "c"]; 
    yield next;
  },
  function *(next) {
    this.body = this.papers;
  }
);

module.exports = papers;