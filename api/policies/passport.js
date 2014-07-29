/**
 * Passport Middleware
 *
 * Policy for Sails that initializes Passport.js and as well as its built-in
 * session support.
 *
 * In a typical web application, the credentials used to authenticate a user
 * will only be transmitted during the login request. If authentication
 * succeeds, a session will be established and maintained via a cookie set in
 * the user's browser.
 *
 * Each subsequent request will not contain credentials, but rather the unique
 * cookie that identifies the session. In order to support login sessions,
 * Passport will serialize and deserialize user instances to and from the
 * session.
 *
 * For more information on the Passport.js middleware, check out:
 * http://passportjs.org/guide/configure/
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
module.exports = function(req, res, next) {
  // Ensure session.authenticated is defined for every controller relying on this authentication mechanism -- osk
  req.session.authenticated = false;

  // Initialize Passport
  passport.initialize()(req, res, function() {
    // Use the built-in sessions
    passport.session()(req, res, function() {
      // Make the user available throughout the frontend
      // even though I should not relay on this line being executed
      // because some views don't pass here. For example,
      // a view matched directly to a route (i.e. without a controller)
      // or api/responses views
      // res.locals.user = req.user;
      // I think I could use passport's
      // req.isAuthenticated() method here -- osk
      // if (req.isAuthenticated()) {
      //   req.session.authenticated = true;
      // }      
      if (req.user) {
        req.session.authenticated = true;
        req.session.user = req.user;
      }
      next();
    });
  });
};