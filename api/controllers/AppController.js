/**
 * AppController
 *
 * @description :: Server-side logic for managing apps
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
"use strict";

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
  createAppEx: function(req, res) {
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
  },
  //rest - json only actions --cg
  /**
   * Adds a plugin (by id) to the app plugins collection (app.plugins)
   *
   * App MUST be owned by logged in user
   *
   * @param app_id
   * @param plugin_id
   *
   * @todo chequear que el plugin PUEDA ser agregado (esta pago o es free)
   */
  attachPlugin: function(req, res) {
    var appId = req.param('id');
    var pluginId = req.param('plugin_id');
    App.findOne(appId)
      .populate('plugins')
      .exec(function appFound(err, app) {
        app.plugins.add(pluginId);
        app.save(function(err) {
          if (err) {
            return res.json(err);
          }
        });
        return res.json(app.toObject());
      });
  },
  /**
   * Creates an app
   *
   * app.owner is set by logged in user
   *
   * params according to models/app
   *
   */
  createApp: function(req, res) {
    var attrs = req.allParams();
    App.create(attrs).done(function appCreated(err, app) {
      if (err)
        return res.json(err);

      res.json(app);
    });
    // console.log(attrs);
    // res.json(attrs);
  },
  updateApp: function(req, res) {

  },
  destroyApp: function(req, res) {

  },
  listAttachedPlugins: function(req, res) {

  },
  viewPluginOptions: function(req, res) {

  },
  updatePluginOptions: function(req, res) {

  },
  deattachPlugin: function(req, res) {

  },
  viewTemplate: function(req, res) {

  },
  attachTemplate: function(req, res) {

  },
  viewTemplateOptions: function(req, res) {

  },
  updateTemplateOptions: function(req, res) {

  },
  deattachTemplate: function(req, res) {

  },
  listAppBuilds: function(req, res) {

  },
  createBuild: function(req, res) {

  },
  viewBuild: function(req, res) {

  }

};