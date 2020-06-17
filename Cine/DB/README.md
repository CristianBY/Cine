# Cine 

## Base de datos

## Implantación paso a paso ⚙️

Una vez instalado MySQL procedemos a la generación de tablas y a la inserción de la información.

En la terminal:

~~~
$ mysql -u [nombre_usuario] -p
~~~

Una vez se ha accedido a la consola de MySQL.

![consola MySQL](../image/mysqlacceso.png)

1. Creamos las tablas. El código para crear la BD lo puedes encontrar en [cine.sql](cine.sql).
2. Insertamos los datos en las tablas creadas. Los datos los puedes encontrar en [inserccionDatosCine.sql](cine.sql)

~~~diff
! OJO 
Las fechas de las proyecciones hay que cambiarlas por las actuales.
~~~

---
Continua con la implantación de NodeJS+Express para la parte Servidor [README.md](../cineServidor/README.md)