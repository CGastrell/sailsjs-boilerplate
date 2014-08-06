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
      });
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

  showApp: function(req, res) {
    App.findOne(req.param('appId'))
      .populate('plugins')
      .populate('appBuild')
      .populate('template')
      .populate('attachedPluginOptions')
      .exec(function appFound(err, app) {
        if (err) {
          return res.json(err);
        }
        var pluginIds = _.map(app.plugins, function(plugin) {
          return plugin._id;
        })
        delete app.plugins;
        app.plugins = pluginIds;

        var latestBuild = _.max(app.appBuild, 'buildNumber');
        app.latestBuild = latestBuild;

        delete app.appBuild;
        delete app.template.description;
        delete app.template.attachedToApps;
        delete app.template.owner;

        _.forEach(app.attachedPluginOptions, function(item) {
          delete item.app;
          delete item.plugin;
        })


        res.json(app.toObject());
      });
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

// User.find({
//   where: {
//     name: {
//       '>=': 'a'
//     }
//   },
//   limit: 15,
//   skip: 15,
//   sort: 'name ASC'
// }, cb);


// {
//   _id: "theAppIdFromMongoDb",
//   name: "app name",
//   description: "the long description for the app",
//   owner: "userId",
//   version: "0.0.1",
//   private: false,
//   icon: "url/of/the/icon.png",
//   template: "templateId",
//   plugins: ["pluginId_1","pluginId_2"],
//   attachedPluginOptions: []
// }

// {
//     "title":"PhoneGap: Getting Started",
//     "id":2,
//     "package":"com.phonegap.getting.started",
//     "version":"1.0.0",
//     "repo":"https://github.com/phonegap/phonegap-start.git",
//     "description":"A template for getting started with
//             PhoneGap development and build.phonegap.com",
//     "debug":false,
//     "private":true,
//     "link":"/api/v1/apps/2",
//     "build_count":12,
//     "status": {
//         "android":"complete",
//         "blackberry":"complete",
//         "ios":"complete",
//         "symbian":"complete",
//         "webos":"complete",
//         "winphone":"complete"
//     },
//     "download":{
//         "android":"/api/v1/apps/1/android",
//         "blackberry":"/api/v1/apps/1/blackberry",
//         "ios":"/api/v1/apps/1/ios",
//         "symbian":"/api/v1/apps/1/symbian",
//         "webos":"/api/v1/apps/1/webos",
//         "winphone":"/api/v1/apps/1/winphone"
//     },
//     "error":{},
//     "icon":{
//         "filename":"big-icon.png",
//         "link":"/api/v1/apps/2/icon"
//     },
//     "role":"admin",
//     "keys":{},
//     "collaborators":{
//         "link":"/api/v1/apps/9/collaborators",
//         "active":[
//             {
//                 "id":9,
//                 "person":"andrew.lunny@nitobi.com",
//                 "role":"admin",
//                 "link":"/api/v1/apps/9/collaborators/9"
//             },
//             {
//                 "id":13,
//                 "person":"foo@bar.com",
//                 "role":"developer",
//                 "link":"/api/v1/apps/9/collaborators/13"
//             }
//         ],
//         "pending":[
//             {
//                 "person":"nobody@nitobi.com",
//                 "role":"tester"
//             }
//         ]
//     }
// }