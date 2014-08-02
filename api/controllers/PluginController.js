/**
 * PluginController
 *
 * @description :: Server-side logic for managing plugins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  listMyPlugins: function(req, res) {

  },
  find: function(req, res) {
    Plugin.find().exec(function pluginsList(err, plugins) {
      if (err) {
        return res.json(err);
      }
      res.json(plugins);
    });
  },
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

  },
  update: function(req, res) {

  },
  destroy: function(req, res) {

  }
};