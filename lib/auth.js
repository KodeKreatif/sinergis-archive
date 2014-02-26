var Router = require ("koa-router");
var jwt = require ("jsonwebtoken");
var qs = require("querystring");
var parse = require("co-body");

var auth = new Router();

auth.post("/authenticate", function * (next) {
  var body = yield parse(this, { limit: "1kb" });

  // @todo check user from database
  if (body.username != "mdamt" && body.password != "12345") {
    this.throw(401, "Invalid username or password");
  }

  // retrieve user's profile
  var profile = {
    firstName: "Mohammad",
    lastName: "DAMT",
    email: "mdamt@mdamt.net",
    id: 123
  };

  var token = jwt.sign(profile, "secret", { expiresInMinutes: 5 });

  this.body = { token : token, type : "bearer" };

});

module.exports = auth;

