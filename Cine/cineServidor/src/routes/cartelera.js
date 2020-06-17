import express from 'express'
import moment from 'moment'
import connection from '../config/connectDB'

/**
 * @type {express}
 */
const router = express.Router()

/**
 * @description Recoge las sesiones de los próximos 7 días para generar la cartelera.
 */
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

/**
 * @description Carga un json con todas las películas.
 */
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

/**
 * @description Añade una película en la base de datos.
 */
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

/**
 * @description Actualiza una película
 */
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

/**
 * @description Elimina una película
 */
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