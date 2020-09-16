# instrucciones para configurar

- configure la conexión a la base de datos desde el archivo "base de datos" de la carpeta "config"
  `mysql://user:pass@example.com:port/dbname.`
- run el "archivo sql" en su servidor de base de datos para crear la base de datos y las tablas requeridas.
- crear un archivo .env para guardar el secreto de jwt `JWT_KEY = Supersecret`
- run "npm install" para instalar todas las dependencias de desarrollo.
- run "npm start" para iniciar el servidor.
