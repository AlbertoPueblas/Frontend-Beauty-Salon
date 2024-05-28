# Frontend-Beauty-Salon

##Objetivo.

El objetivo de este proyecto es crear la parte visual basada en una base de datos relacional creada previamente con diferentes endpoints y vistas de usuario y administrador.

## Tecnologías utilizadas:

![js](https://img.shields.io/badge/JavaScript-yellow?logo=JavaScript) ![](https://img.shields.io/badge/React-ligthblue?logo=React) ![](https://img.shields.io/badge/Redux-purple?logo=Redux) ![css](https://img.shields.io/badge/CSS3-blue?logo=CSS3) ![html](https://img.shields.io/badge/html5-orange?logo=html5)

## Detalles y pasos del proyecto

Una vez tenemos los endpoints y la BBDD construiremos diferentes vistas para que todos los usuarios puedan interactuar con nuestro backend a través de este front con diferentes roles. Los roles son:</br>
<details>
<summary>Roles</summary>

<details>
<Summary>Rol 1: Admin</summary>
El Administrador tiene acceso a todos los rincones y puede realizar diversas acciones:</br>

-Visualizar a todos los usuarios y sus citas pudiendo borrar las citas y usuarios, pudiendo solo desactivar y activar usuarios.</br>
También puede ver su perfil y modificarlo a demás puede también ver todos los estilistas, desactivar y activar su perfil o borrarlo.</br> 
Tiene a su disposición una lista con todas las citas con información detallada. Puede crear, modificar y borrar tratamientos.

<details>
<Summary>Rol 2: Manager o estilista</summary>
El Estilista tiene el acceso algo restringido a diferencia del Administrador, ellos solo pueden visualizar las citas que tienen en su agenda,
y también pueden crear, modificar o borrar tratamientos. Tienen acceso a su perfil y la posibilidad de crearse una cita, modificarla o borrarla al igual que el perfil.

<details>
<Summary>Rol 3: User o Cliente</summary>

El usuario puede estar ya en la base de datos o registrarse. Puede editar sus datos de usuario,
 pedir cita a través de un day picker con horas y días restringidos al impuesto por el admin,
para crear la cita debe escoger un estilista y un tratamiento. posteriormente, puede editarla o borrarla.
Puede ver una lista con sus citas y desactivar su usuario si así lo requiere.
</details>

##Problemas y soluciones:

1. Realizando una llamada al backend la cual se encargaba de desactivar el usuario, me cruce con el problema de que al realizar la acción, al realizarse primero la llamada a la api, los demás pasos de esa función no se llevaran a cabo. </br>
![alt text](<Captura de pantalla 2024-05-18 025359.png>) </br>

La solución que yo encontré fue la siguiente: </br>
![alt text](image.png)

Después de esta solución, el usuario ya puede: Registrarse, loguearse y des-loguearse,
modificar su perfil y contraseña, pedir una cita con día y horarios limitados por el Admin. Puede modificar citas escogiendo día, mes, hora, tratamiento a realizar y estilista que lo ejecute, también puede decidir borrarlas. El usuario cuando borra su perfil simplemente lo desactiva, es el administrador el encargado de volver a activarlo o borrarlo definitivamente

2. Al finalizar la tabla de todos los usuarios, la paginación se desplazaba al final de la tabla, para solucionar esto pintaremos un array de filas vacías para no mover la paginación.
![alt text](image-1.png) </br>
![alt text](image-2.png) </br>
![alt text](image-3.png) </br>

Resultado: </br>
![alt text](image-4.png)

3. Al filtrar por usuarios con citas para un estilista de la lista de usuarios totales, me he encotrado con que a la hora de filtrar la paginacion se descuadra porque alarga los usuarios hasta completar las paginas totales.
La manera mas sencilla que he encontrado ha sido separar las tablas y crear otra solo para estilistas. tambien se podria crear un array a partir de los datos filtrados pero al tener la creación de filas en blanco para completar la tabla y que todo sea mas homogeneo he decidido cambiarlo a otra tabla distinta, por ser una solucion mas sencilla.