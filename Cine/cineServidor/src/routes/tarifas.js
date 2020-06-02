import express from 'express'
import connection from '../config/connectDB'

/**
 * @type {express}
 */
const router = express.Router()

router.get('/', (req,res) => {
    connection.query('SELECT * FROM Tarifa', (err,rows) => {
        if (err) {
            throw err
        } else {
            res.json(rows)
            res.end()
        }
    })
})

router.post('/add', (req,res) =>{
    connection.query('INSERT INTO Tarifa (nombre,descripcion,precio) VALUES (?,?,?)',[req.body.nombre,req.body.descripcion,req.body.precio], (err,results,fields)=>{
        if (err) {
            throw err
        } else {
            console.log('Número de filas añadidas: ' + results.affectedRows)

        }
    })
})

router.post('/modifica', (req,res) =>{
    connection.query('UPDATE Tarifa SET nombre=?, descripcion=?, precio=? WHERE idTarifa=?',[req.body.nombre,req.body.descripcion,req.body.precio,req.body.idTarifa], (err,results,fields)=>{
        if (err) {
            throw err
        } else {
            console.log('Número de filas modificadas: ' + results.affectedRows)

        }
    })
})

router.post('/delete', (req,res) =>{
    connection.query('DELETE FROM Tarifa WHERE idTarifa LIKE ?',[req.body.idTarifa], (err,results,fields)=>{
        if (err) {
            throw err
        } else {
            console.log('Número de filas borradas: ' + results.affectedRows)

        }
    })
})

export default router