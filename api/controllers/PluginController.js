/**
 * PluginController
 *
 * @description :: Server-side logic for managing plugins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  createMushyPlugin: function(req, res) {
    Plugin.create({
      name: 'Mushy',
      description: 'The mushy plugin',
      version: '0.0.0',
      structure: '<button data-role="{{role}}" class="btn btn-primary">{{label}}</button>',
      defaults: {
        role: 'button',
        label: 'My button'
      },
      price: 0,
      owner: req.session.user.id
    }, function(err, plug) {
      if (err) {
        return res.json(err);
      }

      plug.save(function(err) {
        if (err) {
          return res.json(err);
        }
        res.json(plug);
      });
    });

  },
  listMyPlugins: function(req, res) {
    Plugin.find({}).where({
      owner: req.session.user.id
    })
      .exec(function(err, plugins) {
        if (err) {
          return res.json(err);
        }
        res.json(plugins);
      });
  },
  /**
   * View plugin data for pluginId
   *
   * @param pluginId
   * @method GET
   * @endpoint /plugin/:pluginId
   */
  find: function(req, res) {
    Plugin.find().exec(function pluginsList(err, plugins) {
      if (err) {
        return res.json(err);
      }
      res.json(plugins);
    });
  },
  /**
   * Creates a plugin
   *
   * plugin.owner is set by logged in user
   *
   * @returns object created plugin
   * @method POST
   * @endpoint /plugin
   * @todo falta validar y controlar/asegurar los campos/attributes
   * @todo needs testing
   */
  create: function(req, res) {
    var attrs = req.allParams();
    Plugin.create(attrs, function pluginCreated(err, plug) {
      if (err) {
        return res.json(err);
      }
      plug.owner = req.session.user.id;
      plug.save(function plugSaveError(err) {
        if (err) {
          return res.json(err);
        }
        res.json(plug.toObject());
      })
    });

  },
  findOne: function(req, res) {
    Plugin.findOne(req.param('pluginId'), function foundPlug(err, plug) {
      if (err) {
        return res.json(err);
      }

      res.json(plug);
    });
  },
  update: function(req, res) {
    Plugin.findOne(req.param('pluginId'), function foundPlug(err, plug) {
      if (err) {
        return res.json(err);
      }
      var params = req.allParams();
      delete params["_csrf"];
      delete params["pluginId"];

      plug = _.merge(plug, params);

      plug.save(function errorOnSave(err) {
        if (err) {
          return res.json(err);
        }
        res.json({});
      })
    });
  },

  destroy: function(req, res) {
    Plugin.findOne(req.param('pluginId'), function appFound(err, plug) {
      if (err) {
        return res.json(err);
      }

      plug.destroy(function errorOnSave(err) {
        if (err) {
          return res.json(err);
        }
        res.json({});
      })
    });
  }
};