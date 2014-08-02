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

  //rest - json only actions --cg

  /**
   * Lists apps owned by logged in user
   *
   * @returns array with apps.owner = user.id
   * @method GET
   * @endpoint /app
   */
  findMyApps: function(req, res) {
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
   * params according to App model
   * @param _csrf
   * @returns object la app creada
   * @method POST
   * @endpoint /app
   * @todo falta validar y controlar/asegurar los campos/attributes
   */
  create: function(req, res) {
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
        res.json(app.toObject());
      })
    });
  },
  /**
   * View app data for appId
   *
   * App MUST be owned by/allowed to logged in user
   *
   * Checks for user.id == owner.id || editors[user.id] are
   * done in policies/isAppOwnerOrEditor
   *
   * @param app_id
   * @method GET
   * @endpoint /app/:appId
   * @todo where owner o editors == user.id
   * @noteToSelf hasta que no se implemente el policy,
   * esta action busca el appId y luego verifica permisos
   * contra el session.user
   */
  findOne: function(req, res) {
    App.findOne(req.param('appId'))
      .populate('editors')
      .populate('plugins')
      .exec(function appFound(err, app) {
        if (err) {
          return res.json(err);
        }
        res.json(app.toObject());
      });
  },
  /**
   * Modify app
   *
   * App MUST be owned by/allowed to logged in user
   *
   * Checks for user.id == owner.id || editors[user.id] are
   * done in policies/isAppOwnerOrEditor
   *
   * @param app_id
   * @param _csrf
   * @method PUT
   * @endpoint /app/:appId
   * @noteToSelf hacer homogeneas las respuestas de error y con saves/updates
   */
  update: function(req, res) {
    App.findOne(req.param('appId'), function appFound(err, app) {
      if (err) {
        return res.json(err);
      }
      var params = req.allParams();
      delete params["_csrf"];
      delete params["appId"];

      app = _.merge(app, params);

      app.save(function errorOnSave(err) {
        if (err) {
          return res.json(err);
        }
        res.json({});
      })
    });
  },
  /**
   * Delete app
   *
   * App MUST be owned by/allowed to logged in user.
   * There is no UNDO or soft delete
   *
   * Checks for user.id == owner.id || editors[user.id] are
   * done in policies/isAppOwnerOrEditor
   *
   * @param app_id
   * @param _csrf
   * @method DELETE
   * @endpoint /app/:appId
   * @noteToSelf hacer homogeneas las respuestas de error y con saves/updates
   */
  destroy: function(req, res) {
    App.findOne(req.param('appId'), function appFound(err, app) {
      if (err) {
        return res.json(err);
      }

      app.destroy(function errorOnSave(err) {
        if (err) {
          return res.json(err);
        }
        res.json({});
      })
    });
  },
  listAttachedPlugins: function(req, res) {
    App.findOne(req.param('appId'))
      .populate('plugins')
      .exec(function appFound(err, app) {
        if (err) {
          return res.json(err);
        }
        res.json(app.plugins);
      });
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
   * @importante cambiar a PUT?
   * el plugin ya esta creado y la app tambien, simplemente estoy
   * asignando un pluginId al app.plugins
   */
  attachPlugin: function(req, res) {
    var pluginId = req.param('pluginId');
    App.findOne(req.param('appId'))
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