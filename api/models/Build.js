/**
 * Build.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    appId: {
      model: 'App'
    },
    buildNumber: {
      type: 'string'
    },
    android: {
      type: 'string'
    },
    ios: {
      type: 'string'
    },
    winphone: {
      type: 'string'
    }
  }
};