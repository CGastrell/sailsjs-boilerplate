/**
 * App.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },
    description: 'string',

    owner: {
      model: 'User'
    },
    version: 'string',
    'private': 'boolean',
    icon: 'string',
    template: {
      model: 'Template'
    },
    plugins: { //habtm
      collection: 'Plugin',
      via: 'attachedToApps',
      dominant: true
    },
    attachedPluginOptions: {
      collection: 'PluginOptions'
    },
    template: {
      model: 'Template'
    },
    editors: {
      collection: 'User',
      via: 'allowedApps',
      dominant: true
    },
    appBuild: {
      collection: 'Build'
    },
    keys: {
      type: 'json'
    }
  }
};

// {
//   plugins: ['aksjdaosidj', 'aoeifhoaie'],
//   pluginsParams: [{
//     'aksjdaosidj': {
//       title: 'Bienvenido',
//       textBlock: 'Esta app le va a volar la cabeza, fijese los tabs',
//       tabs: {
//         maintab: {
//           title: 'Acerca de',
//           content: ''
//         },
//         terms: {
//           title: 'Terminos y condiciones',
//           content: 'Estos son los terminos y condiciones'
//         },
//         collaborators: {
//           title: 'Mis amigos',
//           content: "Diego, Oscar y Tomas"
//         }
//       }
//     }
//   }]
// }