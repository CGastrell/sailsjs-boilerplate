/**
 * AppController
 *
 * @description :: Server-side logic for managing apps
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  listMyApps: function(req, res) {
    User.findOne(req.session.user.id)
      .populate('ownApps')
      .exec(function(err, user) {
        res.view({
          userdata: user
        });
      });
  },
  newAppForm: function(req, res) {
    res.view();
  },
  createApp: function(req, res) {
    // console.log(req.allParams());
    // return;
    App.create({
      name: req.param('name'),
      description: req.param('description'),
      owner: req.session.user.id
    }, function appCreated(err, app) {
      if (err) {
        req.session.flash = {
          err: err
        }
        return res.redirect('/apps/new');
      }
      // res.json(app);
      app.save(function(err) {
        console.log(err);
        return res.redirect('/apps/new');
      });
      res.redirect('/apps/' + app.id + '/edit');
    });

  },
  viewApp: function(req, res) {
    App.findOne(req.param('id'), function appFound(err, app) {
      res.view({
        appdata: app
      });
    });
  }
};