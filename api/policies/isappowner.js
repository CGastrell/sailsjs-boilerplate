/**
 * isAppOwnerOrEditor
 *
 * @module      :: Policy
 * @description :: checks if logged in user is App owner or is in editors array
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function isAppOwnerOrEditor(req, res, next) {

  App.findOne(req.param('appId'), function appFound(err, app) {
    if (err) {
      return next(err);
    }
    if (!app) {
      return res.notFound();
    }
    if (app.owner == req.session.user.id) {
      return next();
    } else {
      return res.forbidden('Only owner access');
    }
  });

};