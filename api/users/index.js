var Resource = require("koa-resource-router");

// https://github.com/alexmingoia/koa-resource-router

/**
 * This file illustrates how you may use resource based routing
 */

var users = new Resource("users", {
  // GET /users
  index : function *(next) {
    // not implemented
    this.throw (501);
  },
  // GET /users/new
  new : function *(next) {
    this.throw (501);
  },
  // POST /users
  create: function *(next) {
    this.throw (501);
  },
  // GET /users/:id
  show : function *(next) {
    this.throw (501);
  },
  // GET /users/:id/edit
  edit : function *(next) {
    this.throw (501);
  },
  // PUT /users/:id
  update : function *(next) {
    this.throw (501);
  },
  // DELETE /users/:id
  destroy : function *(next) {
    this.throw (501);
  }
});

module.exports = users;