![stack](https://i.ibb.co/jzw9v8s/node.png)

## News-app (test)

Esto es una aplicación de prueba, se encarga de publicar noticias en tiempo real, las mismas estan compuestas de una descripción y una imagen.
 
Consta de una interfaz básica y poco elaborada, sin embargo la idea es familiarizarse con la tecnología **Pub - Sub** de **Redis**, a parte se hace uso de **Socket.io** como uno de los canales de comunicación y se usa el motor de plantillas **Jade** y otro llamado **Handlebars**.

Se muestra como manejar archivos en **Node.js** bajo el framework **Express** y tratar temas de sesiones. Esto es solo el inicio de lo que vas a lograr con node.

----
## Requisitos
1. Node.
2. Mongo.
3. Editor de texto (Sublime text, Atom, Visual Studio Code).
4. Conocimientos en javascript.
5. Yarn.
6. Nodemon.

----
## Instrucciones de uso

1. **Clonar el repositorio**: Copie el link del repositorio y peguelo en la terminal de su sistema operativo de tal manera que se vea así:

        https://github.com/blazinger/express-jade.git

2. **Instale las dependencias**: Acceder a la carpeta donde se ha descargado la aplicación e instale las dependencias :

        cd /express-jade
        yarn install
        
3. **Crea la carpeta 'img'**: En el directorio /public debes crear una carpeta con nombre 'img' donde se guardarán los archivos que subas a través de la aplicación, el resultado debe ser:

       /express-jade/public/img

4. **Ejecutar nodemon** Es una dependencia que activa un proceso monitor para node, lo que permite que no tengas que reiniciar el servidor con cada cambio, el comando seria:

        nodemon app.js