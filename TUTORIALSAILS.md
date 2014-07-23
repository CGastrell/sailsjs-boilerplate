Tutorial de como armar una web app en SailsJS v0.9
=====================

Lista de reproducción en: https://www.youtube.com/watch?v=ep6EQ5f82Ts&list=PLf8i4fc0zJBzLhOe6FwHpGhBDgqwInJWZ&index=4

Blog del autor con más tutoriales y preguntas destacadas: `http://irlnathan.github.io/sailscasts/`


Documentación de Sails v0.9
------------------

`http://sailsjs.org/#!documentation`

Esta guía en video fue hecha basada en SailsJs v0.9. 

_El día 1 de agosto aproximadamente lanzan la versión v0.10 de sails cuya documentación está actualmente en 
http://beta.sailsjs.org/#/documentation/concepts/ _



1- Crear nuevo proyecto
--

```
$ sails new projectName --linker
```



2- Estructura básica de archivos
---

`/config/routes.js`. Desde acá indicamos a qué view queremos apuntar desde una url
/views
acá van las vistas que queramos crear.

`/views/layout.ejs`. Archivo "marco" para nuestras vistas, todo lo que pongamos aca se ve en todas las vistas, todo menos body

`/assests/linker/js`
En este directorio van todos los js que queramos en nuestro sitio. el linker se encarga de crear un solo minified que incluya todo

`/assets/linker/styles`
Idem pero con estilos

`/Gruntfile.js`
En este archivo podemos alternar el orden en que se cargan los estilos o los js. En las variables cssFilesToInject y jsFilesToInject.


3-  Crear nuevo modelo y controller
---
```
$ sails generate className
```

`/api/models/className.js`. Acá podemos establecer que atributos tendra nuestra clase

`/api/controller/classNameController.js`. Acá podemos definir acciones que tendrá nuestra clase.

`action.blueprints` por defecto es `true`. Esto hace que se creen rutas de una acción a una vista con el mismo nombre sin necesidad de modificar el archivo `config/routes.js`.
Llamamos a una vista desde su action correspondiente con `res.view()`.
`res.redirect()` si queremos mandar a otra view en particular.


4-  Validacion de formularios
---

Seteando `module.exports.csrf = true;` en `/config/csrf.js` se previene cross domains requests. 
Con poner un hidden input en nuestro form lo usamos `<input type='hidden' name='_csrf' value='<%= _csrf %>'>`.
Muestra cómo sobreescribir la action `create` de un controller para validar errores, guardar sólo los datos que queremos en la base basados en los atributos del modelo (agregando la key `schema:true` en la clase del modelo) y devolver sólo lo que queremos al usuario (sobreescribir el metodo `toJSON()` en el modelo de la clase).



5- Cómo manejar los errores en los forms.
---

manejo de la variable session.
método `_.clone()` de UnderscoreJS para copiar contenido de variables (en lugar de copiar referencias)
manejo de la variable locals


6-  Uso de policies
---

`/api/policies/myPolicy.js`. Establecer que policies afectan a que controllers o actions

`/config/policies.js`


7- Cómo crear una action que reciba parametros y que muestre una vista en base a los datos procesados.
---

Uso de la funciones `findOne` y `foundUser` (miClase) que trae un objeto de mi base que matchee.


8-  Armado de un list index. Edit y Update
---
crear la accion `index`. Se ejecuta al entrar en `misitio/micontroller`. Hace uso de la función `foundUsers` que devuelve un array con todos los objetos de la clase solicitada.
crear la view `users` que remplaza a la página que muestra el json por defecto.
Creación de actions y views para `edit` y `update`.
Uso del método `update` de la clase que llama a la funcion `userUpdated`.


9-  Delete item
---
Crear un action `destroy`. Usa el metodo `destroy` del controller; llama a la funcion `userDestroyed`.
El método `DELETE` de HTTP se llama desde un form, no desde un link para poder pasar los atributos necesarios por `POST`, porque sino la URL a la que enviamos al hacer destroy deja de existir (?)


10- User Authentication, databases: COMO PASAR A MONGODB
---

`/config/adapters.js`. Define a qué base de datos apuntar. lo comenta
`/config/local.js`.
Agrega el adapter para MongoDB aca porque `local.js` es ignorado por git ya que esté incluido por default en el `.gitignore` que genera `sails new myApp`.

`schema: true` para que la base solo acepte los atributos presentes en el Model.
Instalar el adapter de sails para conectarse a una base mongodb
```
$ npm install sails-mongo --save
```

11- Encriptado de passwords.
---
utiliza el módulo  bcrypt, para instalarlo: 
```
npm install bcrypt --save
```
sobreescribe el metodo `beforeCreate` en el modelo.
valida que el password y el password confirmation sean consistentes.
usa la funcion `hash` de bcrypt para encriptar el password y lo guarda en `values.encryptedPassword` (uno de mis atributos en el modelo)
Para ver los datos guardados en la base usa [Genghis](http://genghisapp.com/).

12- Como clonar desde gitHub el proyecto de web app del autor del tutorial.
---

el archivo `/config/local.js` no esta incluido. Hay que volver a crearlo con la configuración del acaptador para mongoDB.

13- Form de logIn. Sesiones.
---

Crea un nuevo controller que se encargará de todo el manejo de sesiones.
El objeto session tiene por defecto la siguiente estructura:
```
{
  cookie: { 
    path: '/',
    _expires: null,
    originalMaxAge: null,
    httpOnly: true
  },
  _csrf: 'fsdfsdfaafherhergwqgfgsgs'
}
```
Agrega el atributo `authenticated` al objeto session
Uso de `req.session.cookie.expires`.

14- Autenticación de usuario por sesión y uso de policies.
---

Crea la action `create`. En ella evalua que los params obligatorios esten presentes. De no estarlos, carga la variable `flash` (la que usamos para mostrar errores al cargar la página) con un mensaje de error y recarga la página.

Usa el método `findOneByEmail()` que es un dynamic finder para saber si el usuario existe. Si no existe carga un error en la variable `req.session.flash` y recarga la página.

Si exise el usuario usa el mismo mecanismo de encriptación que al guardar, para verificar si matchean las passwords. Si no existe carga un error en la variable `req.session.flash` y recarga la página.
Si matchean las passwords crea `req.session.authenticated = true `y `req.session.user = user`. Y redireciona para la página del prefil de ese usuario.
Cierre de sesión: agrega la action `destroy`, en ella se llama a `req.session.destroy()` y se redirecciona a la página de login.
Uso de policies para evitar que usuarios que no tengan las variables de sesión cargadas no puedan acceder a otra página del sitio que la de login(`/session/new`). 

En el directorio `/api/policies/` crea un nuevo archivo `authenticated.js`. que incluye una función para verificar si el usuario esta autenticado, de no estarlo carga la variable `req.session.fash` y redirecciona a la página de login.

En el archivo `policies.js` y define para el controller user que en el action `new` siga usando la policiy `flash` (que maneja errores en los forms) y para el resto de las action use la nueva policiy `auhenticated`.

15- Mejorar la navegación autenticada
---

Modifica el archivo `layout.ejs`. En los cambios incluye código ejs que verifica el estado de la variable `req.session.authenticated`. Si está definida agrega en la navbar enlaces a página de administración de usuario y logout. Si no esta autenticado agrega un form de login en la navbar.

16- Corrige errores en cuanto a policies en el ejercicio 14.
---

Estaban contempladas las policies en cuanto a logueo de usuario, pero no en cuanto a creación de una cuenta nueva. 
Indica en el archivo `policies.js` que en el action `create` use la policy `flash`.
En la action `create` de `userController.js` agrega el código `req.session.authenticated = true` y `req.session.user = user`.

17- Diferenciación entre distintos roles de usuario.
---

Agrega el a tributo `admin` al model de user. Es booleano, por default es `false`.
En `sessionController.js`, en el action `create` verifica si el usuario tiene `admin` en `true`. De tenerlo, lo redirecciona a `/user` (la página de administración de usuarios).Si no lo tiene  lo redirecciona a su página de usuario.

En el directorio `/api/policies` agrega el archivo `admin.js` que tiene una función que verifica si el usuario esta logueado y si es admin, si no lo es, carga `req.session.flash` con un mensaje de error y lo redirecciona al login.

Modifica el archivo `/config/policies.js`, hace que todas las action llamen a la policy `admin.js`.

En el directorio `/api/policies` agrega el archivo `userCanSeeProfile.js` que verifica si el id de la sesión es igual al id del perfil que se quiere acceder, o si el usuario es admin. De no cumplirse ninguna de las 2, se carga la cariable `req.session.flash` con un mensaje de error y se redirecciona al usuario a la página de login.

Modifica el archivo `/config/policies.js`, hace que la action `show` llame a la policy `userCanSeeProfile.js`.

Modifica el archivo `layout.ejs` y agrega que para poder ver el link de user administration no solo tenga el usuario que estar logueado, sino tambien ser admin.
Agrega en el archivo `/config/policies.js` que en las actions `edit` y `update` se llame a la policy `userCanSeeProfile.js` para que los usuarios puedan editar sus datos.
Agrega código al archivo `/views/user/index.ejs` para que verifique cada usuario del listado si es o no admin, y le asigna una imagen en cada caso.

Hace lo mismo en el header del archivo `/views/user/show.ejs` (página de profile).
Agrega código al archivo `/views/user/edit.ejs` para agregar un checkbox (solo visible si sos admin) mediante el cual se pueda agregar/sacar el rol admin.
En el user model sobrescribe el método beforeValidation que establece el valor del parámetro admin para el user en base al valor del checkbox.


17-a El código generado en el capítulo 17 era inseguro, se podía hacer que un usuario comun sea admin ya que se pasaban la totalidad de los params  en el update, sin verificar antes si el que edita es admin o no.
Lo soluciona creando un objeto que lleva un determinado numero de parametros del usuario de esa session dependiendo de si es admin o no. En lugar de despues pasar todos los params, pasa el objeto limitado.
Tambien hace esos cambios al create para evitar que se de de alta alguien siendo admin.


18- Websockets y socket.io
---
Ejemplo fuera de la app, hace un chat usando **socket.io**.

Extiende el ejemplo agregando el concepto de salas.

19- Agrega los conceptos vistos en el capitulo anterior a la web app principal.
---
Establece una imagen en `views/user/index.js` para mostrar si los usuarios estan logueados o no.
Agrega un nuevo atributo `online` al modelo de user. Es booleano y default `false`.
Modifica la action `create` de `/api/controllers/userController.js`. En ella pone `user.online = true` y usa `user.save` para guardar esa instancia de user.
Hace lo mismo en el `create` de `sessionController.js`
Hace lo mismo en el `destroy` de `sessionController.js` pero en lugar de `user.save` usa `user.update` y apunta al usuario por su `id`.
Agrega código ejs a views/user/index.js para mostrar en una columna el estado de los usuarios

20- Continua con la idea anterior, agrega eventos es tiempo real usando ajax.
---

Mediante los archivos `/assets/linker/js/app.js` y `/assets/linker/js/sails.io.js`
En el archivos `/assets/linker/js/custom.js` van los métodos ajax.
`sails.io.js` simula un `REST` sobre **socket.io**.
Si estamos usando las blueprints de REST, suscribe el socket a una classRoom que escucha todos los cambios realizados al modelo y sus instancias. De esta forma podemos hacer cambios en tiempo real basados en esos cambios.

21- Uso de websockets para brindar eventos de tiempo real
---

Muestra como actualizar de versión.
    
  Para suscribir y escuchar un determinado socket
Agrega la action suscribe al `api/controller/userController.js`
la action suscribe trae todos los users mediante el método `foundUsers`.
suscribe el socket a la sala de la clase de modelo user mediante `User.suscribe(req.socket)
suscribe el socket a la sala de instancias del modelo user mediante User.suscribe(req.socket, users)
Del lado del cliente, en el archivo /assets/linker/js/app.js
se suscribe a ambas salas mediante socket.get(‘/user/suscribe’)
  
  Para mandar mensajes por el socket
en api/controller/sessionConttroller.js
En el action create usa el metodo user.publishUpdate(user.id) que informa el id y loggedin= true.
En el action destroy agrego tambien user.publishUpdate(user.id) que informa el id y loggedin= false.

en userController.js en la action suscribe agrega al final la linea res.send(200) para que no intente renderear html a traves del socket
en policies.js agrego que la action suscribe pase por la policy flash, y no la policy admin que agarraba por defecto (esta era la que trataba de renderear html).

22- Como manipular el DOM en base a los cambios en tiempo real que se escuchan.
---

En `/assests/linker/js/app.js` cambia el `socket.on()` que está por default. Hace que llame a una función determinada.
esta función verifica si el mensaje tiene que ver con el modelo que estoy escuchando mediante message.model que de ser el que busco captura el id y llama a otro método `UpdateUserInDom`
el metodo `UpdateUserInDom` verifica de que pagina es llamado  y si el `message.verb` es `update`
crea el objeto userIndexPage que contiene el método updateUser, el cual cambia el icono del usuario en base al valor de message.data.loggedIn
En el `userController.js` para el serverSide
en la action create agrega `user.publishCreate(user)`
en la action destroy agrega `user.publishDestroy(user.id)`
Vuelve a modificar el archivo `app.js`.

Agrega cláusulas para cuando `message.verb `es `create` y `destroy` que llamarian  a los metodos `addUser` y `destroyUser` del objeto `userIndexPage`

Metodo `addUser`

Para el metodo `addUser` usa un template que representa una linea de la tabla de `views/user/index.ejs`. 
Agrega la libreria underscore.js en el directorio `assets/linker/js/`
cambia el archivo `gruntfile.js`, cambia la variable `defaultFilesToInject` para que en lugar de cargar html carge ejs.

Como el boton para destruir un usuario se agrega tambien en esta fila de la tabla, necesito poder incluir el csrf(porque `delete` lo hace mediante un form). Agrega codigo js en el archivo `views/layout.js` que guarda en una variable `window.overlord` (porque `window` es global) el csrf.
`AddUser` crea un objeto con los datos del usuario + el csrf e indica que despues de la ultima fila de la tabla agregue el template, y le pasa al template el objeto con los datos.

Método `destroyUser`
Recibe el id del user y busca la fila de la tabla por el atributo `data-id` y la remueve del DOM.
Cuando se levanta el servidor el atributo online de cada usuario deberia ser `false`.
En el archivo `config/bootstrap.js` (que se ejecuta antes de que se levante sails) toma todos los usuarios y les cambia el atributo `online` a `false``.

23- Agrega flash messages que responden a eventos en tiempo real
---

En `sessioncontroller.js` en el action `create`, crebamos un objeto `user.publishUpdate`. A `user.publishUpdate` le agregamos los parametros `id` y `loggedIn=true`.
 En `assets/linker/js/app.js`  en la funcion que escucha los mensajes, si el `mensaje.verb` es distinto de `destroy` llamo a la funcion `displayFlashActivity()`
 
En la funcion `displayFlashActivity` que hace un sonido y muestra el mensaje por un instante. El audio se inlcluye en el `layout.ejs` para que este disponible en todas las paginas.
En `sessioncontroller.js` en el action `destroy`, crebamos un objeto  `user.publishUpdate`. A `user.publishUpdate` le agregamos los parametros `name` y `action="has logged out"`
En  `userController` agrega en el action `create` `user.action` con un mensaje avisando que el ususario creo una cuenta y se logueó.
En  `userController` agrega en el action `destroy` usa el `user.publishUpdate` para enviar el nombre del usuario y la action con el mensaje correspondiente a cuando se elimina un usuario

24- Agrega policies para la suscripcion a eventos en tiempo real.
---

Si un usuario elimina a un segundo y el segundo esta online y quiere desloguearse, el sistema caia. 
Para evitarlo, en el `sessionController.js` wrappea el `user.update`, el `user.publishUpdate`, el `req.session.destroy` y el `res.redirect` en una funcion que verifica si el usuario existe, si no existe, redirecciona a la pagina prncipal.

Solo los usuarios logueados deberian estar suscritos a los eventos flash de tiempo real.
Para esto crea el archivo `api/policies/authenticated.js` que verifica si `req.session.user` es `true`, sino le manda un 403.
En `config/policies.js` en el action suscribe (ya tenia la policy `flash`) le agrega para que tambien tenga la policy `authenticated`.

25- Common.js
---

Cómo funciona `common.js` y qué hace. Explica como hace para exponer variables y metodos de un modulo a otro, a traves de la magia de `common.js`.
para exponer se `usa module.exports.varName`
para incluir se usa `require(‘moduleFile’)`
Muestra como incluir varibles y clases
Muestra como usar una clase, ya pasandole los valores para nuestra instancia.
Como exportar un objeto directamente: `module.exports = {obj}`
Para referenciar modulos del core `moduleNamev` para referenciar modulos propios usamos relative paths o absolute paths. Podemos usar solo el nombre del archivo del modulo pero solo lo buscara en determinados directorios dependiendo desde donde se lo quiere referenciar.
Usar carpetas como módulos:
si usamos `require(´directoryAbsPath’)`, trae y ejecuta todo el contenido del directorio (?)
Puede hacer que ejecute todo lo que este dentro de un directorio mediante un `package.json`

26- Deployar una app en sails a heroku
---
Creacion de una base de datos MongoDB en MongoHQ
Apunta la base a la creada en mongoHQ por `local.js`, saca varios parametros e incluye el parametro url.
Creacion de una cuenta en heroku
Como el archivo `local.js` no es parte del deploy por estar ignorado. Se crean variables de hambiente.

Se pasa la configuracion del adapter de `local.js` a `config/locales/adapters.js`   
el parametro url apunta a la variable `process.env.DB_URL`
desde consola agrega la variable de entorno con el comando heroku 
```
config:set DB_URL= direccionQueNosDaMongoDBParaLaBase --app appName
```

Creacion de un archivo procfile en heroku
Agrega un archivo en la raiz de nuestra app con el nombre procfile sin extension, el cual solo incluye la linea: 
```
web: node app.js
```

subir la app a heroku

recomienda hacer un `npm install` para asegurar que tenemos todos los modulos que vamos a usar en su dependencia correspondiente
Desde el dashboard de heroku, en el tab settings copia la url del git que nos brinda heroku
desde consola, parados en nuestra app hacemos:
```
git remote add heroku urlQueCopiamos
```

Hacemos `git add`. y luego `git commit -a`
Finalmente hacemos git push heroku master
heroku recomienda setear un dyno para nuestro app , en consola hacemos heroku ps:scale web=1
Habilitar los websockets de heroku
En consola: 
```
heroku labs:enable websockets
```

Mover el guarado se sesiones y sockets a redis
En el dashboard de heroku, get addons y seleccionar redis to go
Agregar el plan **nano** (free)
Copiar la url de redis que nos brinda heroku
Setear nuestra app para que apunte a redis
en `config/sessions.js` descomentar la configuracion y reemplazar los valores por los que nos brinda la pagina de administracion de redis en el dashboard de heroku. Commitea y pushea los cambios a git.
Verifica si las id de sesiones estan siendo almacenadas en redis mediante el comando `cli`.
Usa otras variables de entorno para no guardar la configuracion de redis en git, usando heroku `config:set`

En `config/sockets.js` descomenta las variables necesarias y crea las variables de entorno para guardar los valores. 

En el procfile cambia la linea web: node app.js a web:
```
NODE_ENV = production node app.js
```
en el `gruntfile.js` modifica el orden en que se cargan los js para que el jquery y el jsvalidate se carguen antes que `app.js`.
Vuelve a modificar los archivos actuales en su app local para dejarla como habiente de desarrollo.








