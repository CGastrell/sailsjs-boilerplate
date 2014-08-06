/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  schema: true,
  attributes: {
    username: {
      type: "string",
      unique: true,
      required: true
    },
    email: {
      type: "string",
      email: true,
      unique: true
    },
    password: {
      type: "string",
      password: true
    },
    passports: {
      collection: "Passport",
      via: "user"
    },
    ownApps: {
      collection: 'App',
      via: 'owner'
    },
    allowedApps: {
      collection: 'App',
      via: 'editors'
    },
    ownPlugins: {
      collection: 'Plugin',
      via: 'owner'
    },
    acquiredPlugins: {
      collection: 'Plugin',
      via: 'acquiredBy'
    },
    ownTemplates: {
      collection: 'Template',
      via: 'owner'
    },
    acquiredTemplates: {
      collection: 'Template',
      via: 'acquiredBy'
    },
    account: {
      type: 'string',
      defaultsTo: 'free'
    },
    active: {
      type: 'boolean'
    },
    online: {
      type: 'boolean'
    }

  }
};