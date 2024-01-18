# BACK.

[MODELOS]
-Los modelos se definieron correctamente.
-Los modelos muestran sus tablas correspondientes en SQL SHELL Y PGADMIN.

[BD]
-Se creó con exito las relaciones en la base de datos.

[SERVER]
-Se ejecuta el servidor correctamente.
-Se utilizo una funcion para cargar los datos de la api, a los registros de la base de datos.
-Contiene sistema de correcion, en caso de que no se carguen los datos a la api, el server no funciona.
-Funciona correctamente.

[CONTROLLERS]
-Se crearon controladores para todos los modelos por separados.
-Se utilizaron todos los métodos vistos, get, post, delete y put.
-Los controladores tiene su respectiva ruta.

[INDEXROUTES]
-Todas los controllers se importaron con éxito.
-Todas las rutas funcionan correctamente y cumplen con sus acciones.
-Cada ruta contiene su controlador funcionando.

# FRONT.
*Todo el front es ajustable a responsiv*

[LANDING]
-Se añade base de datos con usuario.
-Se añade toggle.
-Tiene su respectivo span con las verificaciones de errores.
-Se dispara error en caso de que el usuario no exista en caso de querer logear.
-Se dispara error en caso de que el usuario exista en la DB, al registrarse.
-Deslogear usuario.
-Se bloquea al acceso si se quiere backear con el navegador.
-Se mantiene en la DB el usuario en caso de que la pagina se bloquee.

[NAVBAR]
-Se renderiza en todas las secciones con éxito.
-Contiene el SearchBar.
-Contiene botón de Cerrar Sesion, Home y Actividades.

[SEARCHBAR]
-Se renderiza exitosamente en todos las secciones.
-Filtra únicamente por nombre.
-Filtra en tiempo real.
-Contiene botón de reseto.

[HOME]
-Se renderizan los países exactamente.
-Cada país renderiza sus detalles correctamente.
-Funcionan todas las opciones del navbar.
-El searchBar filtra en tiempo real.

*paginación*
-Todos los botones funcionan correctamente.
-La paginación muestra sus números.
-Activan disabled.
-Cambia el css dependiendo el disabled.

*filtros*
-Todas las combinaciones de filtrado funcionan correctamente.
-Todos las combinaciones de filtrado funcionan correctamente independiente de de los filtrados.
-Los filtros se restablecen cuando se cambia el Continente.
-Los filtros se restablecen cuando se cambia a Actividades.
-El filtro por poblacion y nombre funciona correctamente en cualquier parte del los filtros.
-Estando en actividades, si deseo mostrar un continente se modifica el filtro de Actividades, Nombre y Población.
-Estando en continente, si deseo mostrar una actividad se modifica el filtro de continentes, Nombre y Población.
-Estando en Actividades, si deseo filtrar por continente se filtran correctamente.
-El filtro nombre y poblacion tambien tiene la opcion de mostrar todos los paises.



[FORM]
-El form tiene todas sus validaciones y las renderiza correctamente.
-El form contiene selección multiple.
-Se agrega botón para agregar y elimnar países de una actividad.
-Se agrega botón para eliminar la actividad.
-Se agrega botón para volver al home.
-El formulario muestra una alerta en caso de que exista la actividad.
-El formulario envia al home cada vez que se crea con éxito una actividad.
-Todos los archivos del form contienen boton para volver al inicio de actividades.

*botones de eliminar y añadir*
-Cada botón contiene un color que diferencia su uso en el hover.
-Cada botón dispara una alerta de seguridad.
-Cada botón dispara una alerta de éxito.
-Cada botón dispara una alerta de error de ejecución, ejemplo : en caso de que no exista un país en la actividad y no se pueda eliminar, o que ya exista en el caso de añadir.

-Se puede añadir multiples países a la vez.
-Se puede añadir países de todo el mundo a la misma actividad.

*botón de eliminar actividad*
-El botón contiene un color que diferencia su uso en el hover.
-El botón dispara una alerta de seguridad.
-El botón dispara una alerta de éxito.
-Puede eliminar varias actividades a la vez.

*botón para modificar actividad*
-La seccion permite modificar solo los datos ingresados y mantener los actuales.
-La sección completa automaticamente con todos los datos actuales de la actividad.
-El botón contiene un color que diferencia su uso en el hover.
-El botón dispara una alerta de seguridad.
-El botón dispara una alerta de éxito.
-Se puede modificar actividad para cambiar el nombre, dificultad, duracion y temporada.
-Las modificaciones de Agregar y Eliminar país se hacen en su respectivo botón.
-Contiene su botón para volver.

[ACTIVIDADES]
-Las actividades se renderizan a medida se crean.
-Muestran los detalles de las actividades.

[DETAIL]
-Se renderizan correctamente todos los detalles de los países.
-Contiene un boton para volver al home.

[ERROR]
-Se renderizan correctamente en caso de errores en las rutas.
-Contiene botón para volver al inicio.


# TEST Y PUNTOS EXTRAS

*test*
-Se hicieron por lo menos 1 test de front-end.
-Se hicieron por lo menos 1 test de back-end.
-No se realizo test de modelos.

*puntos extra*
-Se agregaron metodos como delete y put.
-Se agrgaron más modelos.
-Se creó una simulación de creación y registro de usuarios.





