import express from 'express'
import moment from 'moment'
import connection from '../config/connectDB'

/**
 * @type {express}
 */
const router = express.Router()

router.get('/', (req,res) =>{
    connection.query('SELECT * FROM Proyeccion', (err,rows) => {
        if (err) {
            throw err
        } else {
            res.json(rows)
            res.end()
        }
    })
})

router.get('/sala', (req,res) =>{
    connection.query('SELECT * FROM Sala', (err,rows) => {
        if (err) {
            throw err
        } else {
            res.json(rows)
            res.end()
        }
    })
})

router.post('/add', (req,res) =>{
    connection.query('INSERT INTO Proyeccion (fecha,hora,titulo,idSala,idTarifa) VALUES (?,?,?,?,?)',[req.body.fecha,req.body.hora,req.body.titulo,req.body.idSala,req.body.idTarifa], (err,results,fields)=>{
        if (err) {
            throw err
        } else {
            console.log('Número de filas añadidas: ' + results.affectedRows)

        }
    })
})

router.post('/modifica', (req,res) =>{
    let proyeccionUpdate = 'UPDATE Proyeccion SET fecha=?, hora=?, titulo=?, idSala=?, idTarifa=? WHERE idProyeccion=?'
    connection.query(proyeccionUpdate,[new Date(req.body.fecha),req.body.hora,req.body.titulo,req.body.idSala,req.body.idTarifa,req.body.idProyeccion], (err,results,fields)=>{
        if (err) {
            throw err
        } else {
            console.log('Número de filas modificadas: ' + results.affectedRows)

        }
    })
})

router.post('/delete', (req,res) =>{
    connection.query('DELETE FROM Proyeccion WHERE idProyeccion LIKE ?',[req.body.sesion], (err,results,fields)=>{
        if (err) {
            throw err
        } else {
            console.log('Número de filas borradas: ' + results.affectedRows)

        }
    })
})

export default router