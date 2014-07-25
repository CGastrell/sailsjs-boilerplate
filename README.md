# sailjs-boilerplate

a [Sails](http://sailsjs.org) application boilerplate


Features
------

* Passport authentication
 * Config in `local.js`
 * You can use `config/policies/isAuthenticated.js` to grant or deny access to specific controllers as config/policies/passport.js sets `req.session.authenticated=true` if user authenticates using one of passport supported strategies.
* MongoDB Connection 
 * Config in `local.js`.
* Sample `local.js` (`config/local.js.example`);



Installation instructions
-----

 Install SailsJS (globally) and package dependencies

```
$ sudo npm install -g sails@beta
$ npm install
```


Use provided `config/local.js.example`. Database connections and passport strategy providers keys are stored in config/local.js in order to avoid keys being uploaded to a repository by accident.

```
$ cp config/local.js.example config/local.js

```
And lift sails...

```
$ sails lift
```