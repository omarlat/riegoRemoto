EJECUTAR

Para ejecutar la aplicación, al tener que acecder a pines GPIO necesitados hacerlo con permiso de superusurio. Aparte de eso, añadimos como variable de entorno el password del usuario de la BBDD definido en /config/config.properties y el puerto de escucha.

sudo BBDD_PASS=****** PORT=**** node app.js
