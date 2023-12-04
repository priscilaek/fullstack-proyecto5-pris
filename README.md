# Proyecto 5: E-commerce Neuroprotección  ✒️
Este proyecto se realiza como parte del bootcamp de full stack.

# Planeación 📄
Prototipo simple
![Planeación de proyecto](./docs/prototipo.png)

## Version 📌

0.1 

## Author  ⚙️

* **Priscila Elías** 

## Licence 📄

Open source.

## Documentación del Proyecto 📄

Este proyecto es una aplicación web de servicios. Se divide en dos partes principales: el servidor y el cliente.

## Servidor

El servidor está construido con Node.js y Express. Utiliza MongoDB como base de datos y Mongoose para la interacción con la base de datos. Además, se utiliza Stripe para el manejo de pagos.

### Instalación

Para instalar el servidor, necesitarás Node.js y npm instalados en tu máquina. Luego, puedes clonar el repositorio y ejecutar `npm init --yes` para inicializar el proyecto. 

Es importante generar un archivo `.gitignore` al inicio del proyecto para evitar subir archivos innecesarios o sensibles al repositorio. Los archivos que se deben ignorar incluyen:

```
node_modules/
.env
```

Las dependencias principales del servidor incluyen Express, Nodemon y CORS. Puedes instalarlas con `npm install`.

### Base de Datos

La conexión a la base de datos se realiza a través del archivo `db.js` en la carpeta config. 

### Controladores

El servidor tiene varios controladores para manejar diferentes rutas y funcionalidades. 

### Rutas

Las rutas del servidor se definen en el archivo `index.js` y se manejan a través de diferentes controladores.

## Cliente

El cliente está construido con React y Vite. Utiliza CSS para el estilo y tiene varias páginas, incluyendo una página de registro, una página de inicio de sesión y una página de carrito.

### Instalación

Para instalar el cliente, necesitarás Node.js y npm instalados en tu máquina. Luego, puedes clonar el repositorio y ejecutar `npm install` para instalar las dependencias.

### Páginas

El cliente tiene varias páginas, incluyendo una página de registro (`registro/index.jsx`), una página de inicio de sesión (`iniciar-sesion/index.jsx`) y una página de carrito (`carrito/index.jsx`).

### Estilos

Los estilos del cliente se definen en el archivo `App.css`.

## Códigos de Respuesta

El servidor utiliza códigos de respuesta específicos para indicar ciertos estados o errores. Por ejemplo, el código 5841 indica que un usuario no se encuentra en la base de datos.