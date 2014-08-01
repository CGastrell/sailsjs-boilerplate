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
  'put /me': 'UserController.updateUser',

  //routes para plugin rest api
  'get /plugin': 'PluginController.listMyPlugins',
  'post /plugin': 'PluginController.createPlugin',
  'get /plugin/:pluginId': 'PluginController.viewPlugin',
  'put /plugin/:pluginId': 'PluginController.updatePlugin',
  'delete /plugin/:pluginId': 'PluginController.destroyPlugin',

  //routes para template rest api
  'get /template': 'TemplateController.listMyTemplates',
  'post /template': 'TemplateController.createTemplate',
  'get /template/:templateId': 'TemplateController.viewTemplate',
  'put /template/:templateId': 'TemplateController.updateTemplate',
  'delete /template/:templateId': 'TemplateController.destroyTemplate',

  // routes para app rest api
  'get /app': 'AppController.listMyApps',
  'post /app': 'AppController.createApp',
  'get /app/:appId': 'AppController.viewApp',
  'put /app/:appId': 'AppController.updateApp',
  'delete /app/:appId': 'AppController.destroyApp',

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


  // If a request to a URL doesn't match any of the custom routes above,
  // it is matched against Sails route blueprints.  See `config/blueprints.js`
  // for configuration options and examples.

};