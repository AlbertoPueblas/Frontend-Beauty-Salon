# Frontend-Beauty-Salon

## Objetivo.

El objetivo de este proyecto es crear la parte visual basada en una base de datos relacional creada previamente con diferentes endpoints y vistas de usuario y administrador.

## Tecnologías utilizadas:

![js](https://img.shields.io/badge/JavaScript-yellow?logo=JavaScript) ![](https://img.shields.io/badge/React-ligthblue?logo=React) ![](https://img.shields.io/badge/Redux-purple?logo=Redux) ![css](https://img.shields.io/badge/CSS3-blue?logo=CSS3) ![html](https://img.shields.io/badge/html5-orange?logo=html5)

## Resumen del proyecto.

Esta parte del proyecto es la parte visual con la que interactuaremos con el backend a través de hacer las correspondientes llamadas al backend. 
Empezaremos por las vistas de registro y logueado. Una vez las tengamos realizamos las demás llamadas al backend modificando los endpoints si fuese necesario.
Lo mismo realizaremos para las vistas de Administrador y Manager, y una vez tengamos las básicas jugaremos a crear nuevas posibilidades.

## Detalles y pasos del proyecto

Una vez tenemos los endpoints y la BBDD construiremos diferentes vistas empezando por el registro que contará con la fecha del registro de usuarios y el logueado, para que todos los usuarios puedan interactuar con nuestro backend a través de este front con diferentes roles. Los roles son:</br>
<details>
<summary>Roles</summary>


## Rol 1: Admin
El Administrador tiene acceso a todos los rincones y puede realizar diversas acciones:</br>

-Visualizar a todos los usuarios y sus citas pudiendo borrar las citas y usuarios, pudiendo solo desactivar y activar usuarios.</br>
También puede ver su perfil y modificarlo a demás puede también ver todos los estilistas, desactivar y activar su perfil o borrarlo.</br> 
Tiene a su disposición una lista con todas las citas con información detallada. Puede crear, modificar y borrar tratamientos.

## Rol 2: Manager o estilista
El Estilista tiene el acceso algo restringido a diferencia del Administrador, ellos solo pueden visualizar las citas que tienen en su agenda,
y también pueden crear, modificar o borrar tratamientos. Tienen acceso a su perfil y la posibilidad de crearse una cita, modificarla o borrarla al igual que el perfil.

## Rol 3: User o Cliente

El usuario puede estar ya en la base de datos o registrarse. Puede editar sus datos de usuario,
pedir cita a través de un day picker con horas y días restringidos al impuesto por el admin,
para crear la cita debe escoger un estilista y un tratamiento. posteriormente, puede editarla o borrarla.
Puede ver una lista con sus citas y desactivar su usuario si así lo requiere.

</details>

## Problemas y soluciones:

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

4. Otro problema con el que me topé fue, a la hora de renderizar las citas se mostraban el ID de usuarios, clientes, estilistas. Esta solución conllevó tener que volver al back-end para verificar los datos enviados al front y después de algunos console.log conseguimos traer la información deseada.

5. El siguiente problema surgía en la paginación a la hora de borrar un dato que se encuentra el primero y solo en una página. A la hora de borrarlo saltaba el error de que no se encontraba la página y se quedaba congelado. Este es el código con el problema.</br>
![alt text](image-5.png)</br>
La solución fue implementar unas líneas de código para que verifique que si la página se queda vacía, debe actualizar el estado y renderizar de nuevo.</br>
![alt text](image-6.png)

## Futuras actualizaciones.

1. Implementar un input de busqueda para el administrador.
2. codigo optimizado.
3. mejoras en ciertas vistas.
4. mejoras en la parte visual.
5. incluir funciones para la facturación.

## Links 

[Link Back-end](https://github.com/AlbertoPueblas/Backend-Beauty-salon)

## Contribuciones
Las sugerencias y aportaciones son siempre bienvenidas.  

Puedes hacerlo de dos maneras:

1. Abriendo una issue
2. Crea un fork del repositorio
    - Crea una nueva rama  
        ```
        $ git checkout -b feature/nombreUsuario-mejora
        ```
    - Haz un commit con tus cambios 
        ```
        $ git commit -m 'feat: mejora X cosa'
        ```
    - Haz push a la rama 
        ```
        $ git push origin feature/nombreUsuario-mejora
        ```
    - Abre una solicitud de Pull Request

## Licencia
Este proyecto se encuentra bajo licencia de "Alberto Pueblas"</br>
Derechos de imagen: Maria Plaza Estilistas.

## Webgrafia:
Para conseguir adquirir más conocimientos he recopilado información de:
- webs
- link a documentación de librerías externas
- paquetes como toastify para manejar errores