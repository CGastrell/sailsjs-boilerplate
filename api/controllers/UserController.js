/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  _config: {
    actions: false,
    rest: false
  },
  viewUser: function(req, res) {
    res.json(req.session.user);
  },
  update: function(req, res) {}

};