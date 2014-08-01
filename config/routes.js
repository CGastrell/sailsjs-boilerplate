/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on routes, check out:
 * http://links.sailsjs.org/docs/config/routes
 */

module.exports.routes = {


  // Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, etc. depending on your
  // default view engine) your home page.
  //
  // (Alternatively, remove this and add an `index.html` file in your `assets` directory)
  // '/': {
  //   view: 'homepage'
  // },

  // I do this for having a controller
  // that can pass through policies. -- osk
  "/": "HomeController.homepage",

  // Added these routes Following https://github.com/kasperisager/sails-generate-auth/ instructions -- osk
  'get /login': 'AuthController.login',
  'get /logout': 'AuthController.logout',
  'get /register': 'AuthController.register',

  'post /auth/local': 'AuthController.callback',
  'post /auth/local/:action': 'AuthController.callback',

  'get /auth/:provider': 'AuthController.provider',
  'get /auth/:provider/callback': 'AuthController.callback',

  // Custom routes here...
  // 'get /apps': 'AppController.listMyApps',
  // 'get /apps/new': 'AppController.newAppForm',
  // 'get /apps/:id/edit': 'AppController.viewApp',
  // 'post /apps/new': 'AppController.createAppEx',


  //routes para user rest api
  'get /me': 'UserController.viewUser',
  'put /me': 'UserController.update',
  'get /me/plugin': 'PluginController.listMyPlugins',
  'get /me/template': 'TemplateController.listMyTemplates',


  //routes para plugin rest api
  'get /plugin': 'PluginController.find',
  'post /plugin': 'PluginController.create',
  'get /plugin/:pluginId': 'PluginController.findOne',
  'put /plugin/:pluginId': 'PluginController.update',
  'delete /plugin/:pluginId': 'PluginController.destroy',

  //routes para template rest api
  'get /template': 'TemplateController.find',
  'post /template': 'TemplateController.create',
  'get /template/:templateId': 'TemplateController.findOne',
  'put /template/:templateId': 'TemplateController.update',
  'delete /template/:templateId': 'TemplateController.destroy',

  // routes para app rest api
  'get /app': 'AppController.findMyApps',
  'post /app': 'AppController.create',
  'get /app/:appId': 'AppController.findOne',
  'put /app/:appId': 'AppController.update',
  'delete /app/:appId': 'AppController.destroy',

  'get /app/:appId/plugin': 'AppController.listAttachedPlugins',
  'post /app/:appId/plugin': 'AppController.attachPlugin',
  'get /app/:appId/plugin/:pluginId': 'AppController.viewPluginOptions',
  'put /app/:appId/plugin/:pluginId': 'AppController.updatePluginOptions',
  'delete /app/:appId/plugin/:pluginId': 'AppController.dettachPlugin',

  'get /app/:appId/template': 'AppController.viewTemplate',
  'post /app/:appId/template': 'AppController.attachTemplate',
  'get /app/:appId/template/:templateId': 'AppController.viewTemplateOptions',
  'put /app/:appId/template/:templateId': 'AppController.updateTemplateOptions',
  'delete /app/:appId/template/:templateId': 'AppController.dettachTemplate',
  'get /app/:appId/build': 'AppController.listAppBuilds',
  'post /app/:appId/build': 'AppController.createBuild',
  'get /app/:appId/build/:buildId': 'AppController.viewBuild'


  // If a request to a URL doesn't match any of the custom routes above,
  // it is matched against Sails route blueprints.  See `config/blueprints.js`
  // for configuration options and examples.

};