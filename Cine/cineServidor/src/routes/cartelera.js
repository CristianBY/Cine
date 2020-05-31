import express from 'express'
import moment from 'moment'
import connection from '../config/connectDB'

const router = express.Router()

router.get('/', (req,res) => {
    let timeNow = moment().format('YYYY-MM-DD')
    let timeSemana = moment().add(7, 'days').format('YYYY-MM-DD') // Últimos siete días
    connection.query('SELECT * FROM Proyeccion WHERE fecha >= ? AND fecha < ?', [timeNow,timeSemana], (err,rows) => {
        if (err) {
            throw err
        } else {
            res.json(rows)
            res.end()
        }
    })
})

router.get('/pelicula', (req,res) =>{
    connection.query('SELECT * FROM Pelicula', (err,rows) => {
        if (err) {
            throw err
        } else {
            res.json(rows)
            res.end()
        }
    })
})

router.post('/add', (req,res) =>{
    let peliculaAdd = 'INSERT INTO Pelicula (titulo, anyo, pais, genero, calificacion, duracion, estreno, sinopsis) VALUES (?,?,?,?,?,?,?,?)'
    connection.query(peliculaAdd,[req.body.titulo,req.body.anyo,req.body.pais,req.body.genero,req.body.calificacion,req.body.duracion,new Date(req.body.estreno),req.body.sinopsis], (err,results,fields)=>{
        if (err) {
            throw err
        } else {
            console.log('Número de filas añadidas: ' + results.affectedRows)
        }
    })
})

router.post('/modifica', (req,res) =>{
    let peliculaUpdate = 'UPDATE Pelicula SET titulo=?, anyo=?, pais=?, genero=?, calificacion=?, duracion=?, estreno=?, sinopsis=? WHERE titulo=?'
    connection.query(peliculaUpdate,[req.body.tituloNuevo,req.body.anyo,req.body.pais,req.body.genero,req.body.calificacion,req.body.duracion,new Date(req.body.estreno),req.body.sinopsis,req.body.titulo], (err,results,fields)=>{
        if (err) {
            throw err
        } else {
            console.log('Número de filas actualizadas: ' + results.affectedRows)

        }
    })
})

router.post('/delete', (req,res) =>{
    connection.query('DELETE FROM Pelicula WHERE titulo LIKE ?',[req.body.titulo], (err,results,fields)=>{
        if (err) {
            throw err
        } else {
            console.log('Número de filas borradas: ' + results.affectedRows)

        }
    })
})



export default router