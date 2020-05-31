import mysql from 'mysql'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'alumnado',
    database: 'Cine',
    port: 3306
})

connection.connect((error) => {
    if(error){
       throw error
    }else{
       console.log('Conexion correcta.')
    }
})

export default connection