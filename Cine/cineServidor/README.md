# Cine 

## Parte servidor

## Implantación paso a paso ⚙️

Una vez configurada la [base de datos](../DB/README.md), pasamos a la instalación de node.

Como **npm run start** no puede desplegar la aplicación en segundo plano. En la terminal nos situamos en el raíz del proyecto (carpeta cineServidor) e insstalamos
pm2 que nos da la facilidad de desplegar nuestro servidor en segundo plano.

Para instalar pm2:

~~~
$ sudo npm install pm2 -g
~~~

Para lanzar nuestro servidor:

~~~
$ pm2 start npm -- start
~~~

Ahora nuestro servidor está desplegado correctamente y la terminal libre.

---
Continuamos con la implantación de Angular para la parte Cliente [README.md](../cineCliente/README.md).