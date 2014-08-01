/**
 * AppController
 *
 * @description :: Server-side logic for managing apps
 * @help        :: See http://links.sailsjs.org/docs/controllers
 * @todo revisar estructura de error de sails:
 *
 {
    "error": "E_UNKNOWN",
    "status": 500,
    "summary": "Encountered an unexpected error",
    "raw": {}
}
para generar errores propios del mismo formato
 * 
 */
"use strict";

module.exports = {
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
        // console.log(err);
        return res.redirect('/apps/new');
      });
      res.redirect('/apps/' + app.id + '/edit');
    });

  },
  //rest - json only actions --cg

  /**
   * Lists apps owned by logged in user
   *
   * @returns array with apps.owner = user.id
   * @method GET
   * @endpoint /app
   */
  listMyApps: function(req, res) {
    User.findOne(req.session.user.id)
      .populate('ownApps')
      .exec(function(err, user) {
        if (err) {
          return res.json(err);
        }
        res.json(user.ownApps);
      });
  },
  /**
   * Creates an app
   *
   * app.owner is set by logged in user
   *
   * params according to models/app
   * @returns object la app creada
   * @method POST
   * @endpoint /app
   * @todo falta validar y controlar/asegurar los campos/attributes
   */
  createApp: function(req, res) {
    var attrs = req.allParams();
    App.create(attrs, function appCreated(err, app) {
      if (err) {
        return res.json(err);
      }
      app.owner = req.session.user.id;
      app.save(function appSaveError(err) {
        if (err) {
          return res.json(err);
        }
        res.json(app);
      })
    });
    // return res.json(app.toObject());
  },
  /**
   * View app data for appId
   *
   * App MUST be owned by/allowed to logged in user
   *
   * @param app_id
   * @method GET
   * @endpoint /app/:appId
   * @todo where owner o editors == user.id
   */
  viewApp: function(req, res) {
    App.findOne(req.param('appId'))
      .populate('editors')
      .populate('plugins')
      .exec(function appFound(err, app) {
        if (err) {
          return res.json(err);
        }
        // console.log();
        if (!app) {
          console.log('app not found');
          return res.json(module.exports.emptyError);
        }
        if (app.owner != req.session.user.id && !app.editors[req.session.user.id]) {
          //el usuario logeado no se encuentra como owner ni editor
          console.log('owner not allowed');
          return res.json(module.exports.forbiddenError);
        } else {
          res.json(app);
        }
      });
  },
  updateApp: function(req, res) {

  },
  destroyApp: function(req, res) {

  },
  listAttachedPlugins: function(req, res) {

  },

  /**
   * Adds a plugin (by id) to the app plugins collection (app.plugins)
   *
   * App MUST be owned by logged in user
   *
   * @param app_id
   * @param plugin_id
   * @method POST
   * @endpoint /app/:appId/plugins
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
  viewPluginOptions: function(req, res) {

  },
  updatePluginOptions: function(req, res) {

  },
  dettachPlugin: function(req, res) {

  },
  viewTemplate: function(req, res) {

  },
  attachTemplate: function(req, res) {

  },
  viewTemplateOptions: function(req, res) {

  },
  updateTemplateOptions: function(req, res) {

  },
  dettachTemplate: function(req, res) {

  },
  listAppBuilds: function(req, res) {

  },
  createBuild: function(req, res) {

  },
  viewBuild: function(req, res) {

  },

  emptyError: {
    "error": "E_EMPTY",
    "status": 404,
    "summary": "Model doesn't exist",
    "raw": {}
  },
  forbiddenError: {
    "error": "E_FORBIDDEN",
    "status": 403,
    "summary": "User credentials don't match",
    "raw": {}
  }
};