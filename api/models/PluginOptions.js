/**
 * PluginOptions.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  schema: false,
  attributes: {
    app: {
      model: 'App'
    },
    plugin: {
      model: 'Plugin'
    },
    parent: {
      type: 'string'
    }
  }
};

// {
//   app: "651989198ihgkukcku",
//   plugin: "pqwienpq9ncq[2n93nc",
//   parent: "headerBar",

//   role: "button",
//   label: "Visit my homepage"
// }