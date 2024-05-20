# Frontend-Beauty-Salon

##objetivo.

El objetivo de este proyecto es crear la parte visual basada en una base de datos relacional creada previamente con diferentes endpoints y vistas de usuario y administrador.

## Tecnologías utilizadas:

![js](https://img.shields.io/badge/JavaScript-yellow?logo=JavaScript) ![](https://img.shields.io/badge/React-ligthblue?logo=React) ![](https://img.shields.io/badge/Redux-purple?logo=Redux) ![css](https://img.shields.io/badge/CSS3-blue?logo=CSS3) ![html](https://img.shields.io/badge/html5-orange?logo=html5)


## Detalles y pasos del proyecto

En esta parte frontal intentaré que toda la aplicación sea responsive, realizando tareaes en endpoinds me he cruzado con bastantes problemas y uno de ellos es el siguiente: </br>
Realizando una llamada al backend la cual se encargaba de desactivar el usuario me cruce con el problema de que al realiar la acción al realizarse primero la llamada a la api los demas pasos de esa funcion no se llevaban a cabo. </br>
![alt text](<Captura de pantalla 2024-05-18 025359.png>) </br>

La solución que yo encontré fue la siguiente: </br>
![alt text](image.png)

Despues de esta solucion el usuario ya puede: Registrarse, loguearse y desloguearse,
modificar su perfil y contraseña, pedir una cita con dia y horarios limitados por el Admin. Puede modificar citas escogiendo dia mes hora tratamiento a realizar y estilista que lo ejecute tambien puede decidir borrarlas borrarlas. El usuario cuando borra su perfil simplemente lo desactiva es el admin el encargado de volver a activarlo o borrarlo definitivamente

