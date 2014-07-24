/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  blueprints: {
    shortcuts: false,
    rest: false
  },
  homepage: function(req, res) {
    res.view();
  }
};