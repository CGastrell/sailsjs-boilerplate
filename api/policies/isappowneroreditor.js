/**
 * isAppOwnerOrEditor
 *
 * @module      :: Policy
 * @description :: checks if logged in user is App owner or is in editors array
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function isAppOwnerOrEditor(req, res, next) {

  App.findOne(req.param('appId'))
    .populate('editors')
    .exec(function appFound(err, app) {
      if (err) {
        return next(err);
      }
      if (!app) {
        // console.log('no encontre la app');
        return res.notFound();
      }
      // console.log(app);
      var isAllowed = (app.owner == req.session.user.id || app.editors[req.session.user.id]);
      if (isAllowed) {
        return next();
      } else {
        return res.forbidden('Must be owner or editor to access app');
      }
    });


  // console.log('ostias', req.param('appId'));
  // console.log(req.session.user.ownApps);
  // console.log(req.session.user.ownApps[req.param('appId')]);
  // if (req.session.user.ownApps[req.param('appId')] || req.session.user.allowedApps[req.param('appId')]) {
  //   return next();
  // }
  // return res.forbidden('Must be owner or editor to access app');
};