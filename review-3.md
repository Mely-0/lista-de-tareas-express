#¿Qué es mi producto y para que sirve?
R: mi producto es una lista de tareas creada desde el framework de express, este producto sirve poder hacer el ingreso de las tareas , con ello poder organizar nuestro dia y tener mas productividad en este. 

#¿Cuáles son las funcionalidades más importantes y porque los usuarios las usarían?
R: con esta lista de tareas podras listar , agregar , actualizar y eliminar , pero con la actualizacion podras realizar un registro de usuario , claramente este registro lo podra realizar unicamente un admi , y poder definir los roles de cada usurio agregado , con ello podra realizar distintas acciones de acuerdo al rol asignado.

#Rutas actuales : 
/lista: se podra visualizar las tareas actuales.
/lista: se podra agregar por medio de esta ruta. 
/lista/&ide : se podra realizar la eliminacion de la tarea agregandole comop parametro el id.
/lista/&ide : se podra realizar la actualizacion que desee por medio del id que se envia como parametro.
/estado/&completada  o /estado/&incompleta : se podran visualizar cuales son las tareas completadas y cuales no , y podran ontener por medio del parametro que le enviamos y de acuerdo a este , se podran obtener tanto las completadas , como las incompletas.

#Nuevas rutas : 
/login: podras obtener el token de los usuarios ya existentes
/agregarUsuario : podras agregar usuarios 
