/**
 * Plugin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    structure: {
      type: 'string'
    },
    defaults: {
      type: 'json'
    },
    owner: {
      model: 'User'
    },
    version: 'string',
    attachedToApps: {
      collection: 'App',
      via: 'plugins'
    },
    price: {
      type: 'float',
      defaultsTo: 0.0
    },
    acquiredBy: {
      collection: 'User',
      via: 'acquiredPlugins'
    }

  }
};

// {
//   structure: "<h1>{{title}}</h1><p>{{textBlock}}</p><div id='tabs'><ul class='tab-title'>{{@tabs}}<li>{{tab.title}}</li>{{/tabs}}</ul><ul class='tab-panels'>{{@tabs}}</div>",
//   defaults: {
//     title: 'Este es el titulo que aparece en el plugin',
//     textBlock: "Aca va el contenido principal del plugin",
//     tabs: {
//       tab1: {
//         title: "Tab Sample 1",
//         content: "Tab sample 1 content"
//       },
//       tab2: {
//         title: "Tab Sample 2",
//         content: "Tab sample 2 content"
//       }
//     }
//   }
// }