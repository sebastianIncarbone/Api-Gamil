# Api-Gamil 

### Para poder iniciar el proyecto. Sigue estos pasos:

    - git clone "La ruta del mismo"
    - npm install
    - Copiar tus credenciales.Json de google en la carpeta resources

### Posterior a esto damos inicio al sever con

    - npm start

### Luego devemos autenticar nuestra api con sus credenciales para que google nos de el Token. Esto se hace
mediante un endpoint especifico

    - Un GET al "http://localhost:3010/auth" [Para que nos retorne el link de accesos]
    - Ingresamos al link. Nos proveera de un codigo. El cual enviaremos con un POST al "http://localhost:3010/auth/".
    - Luego poremos enviar mails.

## IMPORTANTE! Todos los mensajes de postman disponibles se encuantran en su carpeta.