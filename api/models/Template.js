/**
 * Template.js
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
    owner: {
      model: 'User'
    },
    css: {
      type: 'string' //cuerpo del css
    },
    js: {
      type: 'string' //cuerpo del js
    },
    fonts: {
      type: 'array'
      //array de urls donde buscar las fonts
      //esto tiene que estar documentado para que dentro
      //de los css el tipo haga el import con las url absolutas
      //a los fonts sino no vamos a poder importarlas
    },
    attachedToApps: {
      collection: 'App',
      via: 'template'
    },
    acquiredBy: {
      collection: 'User',
      via: 'acquiredTemplates'
    }
  }
};