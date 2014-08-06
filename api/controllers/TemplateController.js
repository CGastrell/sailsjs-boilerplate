/**
 * TemplateController
 *
 * @description :: Server-side logic for managing templates
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  listMyTemplates: function(req, res) {

  },
  find: function(req, res) {

  },
  /**
   * Creates a template
   *
   * template.owner is set by logged in user
   *
   * @returns object created template
   * @method POST
   * @endpoint /template
   * @todo falta validar y controlar/asegurar los campos/attributes
   * @todo needs testing
   */
  create: function(req, res) {
    var attrs = req.allParams();
    Template.create(attrs, function templateCreated(err, tpl) {
      if (err) {
        return res.json(err);
      }
      tpl.owner = req.session.user.id;
      tpl.save(function tplSaveError(err) {
        if (err) {
          return res.json(err);
        }
        res.json(tpl.toObject());
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