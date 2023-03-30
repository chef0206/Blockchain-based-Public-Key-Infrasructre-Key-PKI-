const routes = require('next-routes')()
// require('next-routes') returns a fxn, and the 2nd () envokes that function

routes
  .add("/certificates/new", "/certificates/new") //Added before the ":address" route so that it can override it
  // .add("/rsa/keys", "/rsa/keys") //Added before the ":address" route so that it can override it
   //Added before the ":address" route so that it can override it
  .add("/certificates/:address", "/certificates/show")

module.exports = routes;