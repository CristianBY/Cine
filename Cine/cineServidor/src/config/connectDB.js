import mysql from 'mysql'

/**
 * @description Datos para la conexión a la base de datos
 */
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'alumnado',
    database: 'Cine',
    port: 3306
})

/**
 * @description Establece la conexión
 */
connection.connect((error) => {
    if(error){
       throw error
    }else{
       console.log('Conexion correcta.')
    }
})

export default connection