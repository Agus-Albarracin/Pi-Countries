- Route not match.
-se hizo verificacion de importacion de modulos, de rutas, de typeo.
-aun asi el archivo lanzaba warning pero se ejecutaba ala perfeccion con sus funciones.

-se intento cambiar el pack.json y trabajar con versiones anteriores.
-hubo que desinstalar las dependecias actual, lo que hizo que a la hora de volver a instalarlas, el arhicvos
package-lock.json se borraron mas de 100 lineas de codigos. 
-Se trabajo con el control source para comparar los archivos antes de remover las dependecias y actualizarlas.

-se utilizo npm update para trabajar con las dependecias más recientes.

-se modifico el back y se testió que las rutas existieran, por lo que devuelve el objeto correspondiente al id.
(se renderiza en el front pero tira el warning)

- se ultilizo la herramiento de entorno de window -> rimaf con el comando npm install -g rimraf
-lo que permitia eliminar los node_modules para volver a instalarlos. 
- al hacerlo, los archivos de los node_modules se instalaron de manera incorrecta, por lo que se tuvo que acceder a commits anteriores para poder ejecutar correctamente el proyecto.