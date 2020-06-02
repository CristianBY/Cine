import express from 'express'
import moment from 'moment'
import connection from '../config/connectDB'

/**
 * @type {express}
 */
const router = express.Router()

router.get('/', (req,res) => {

    connection.query('SELECT * FROM Reserva', (err,rows) => {
        if (err) {
            throw err
        } else {
            res.json(rows)
            res.end()
        }
    })
})

router.post('/', (req,res) => {
    let consulta = 'select P.titulo, P.fecha, P.hora, P.idSala, T.precio, S.aforo-IFNULL(sum(R.butacas),0) as libre from Sala S, Proyeccion P, Tarifa T, Reserva R where P.idProyeccion=? AND S.idSala=P.idSala AND T.idTarifa=P.idTarifa AND P.idProyeccion=R.idProyeccion'
    connection.query(consulta,[req.body.idProyeccion], (err,rows) => {
        if (err) {
            throw err
        } else {
            res.json(rows)
            res.end()
        }
    })
})

router.post('/reservado', (req,res) =>{
    let consulta = 'insert into Reserva (butacas, idProyeccion, idUsuario) values (?,?,?)'
    connection.query(consulta,[req.body.butaca,req.body.idProyeccion,req.body.idUsuario],(err,rows)=>{
        if (err) {
            throw err
        } else {
            if (rows == 1){
                res.json({mensaje: 'Reserva realizada'})
                res.end()
            } else {
                res.json({mensaje: 'Reserva no realizada'})
                res.end()
            }    
        }
    })
})

router.get('/valorada/:usuario',(req,res)=>{
    let user = req.params.usuario.substr(1);
    let consulta = 'select distinct P.titulo, V.valoracion from Proyeccion P, Valoracion V, Reserva R where R.idProyeccion= P.idProyeccion AND R.idUsuario=V.idUsuario AND V.titulo=P.titulo AND R.idUsuario= ?'
    connection.query(consulta,[user],(err,rows) => {
        if (err){
            throw err
        } else {
            res.json(rows)
            res.end()
        }
    })
})

router.get('/novalorada/:usuario',(req,res)=>{
    let user = req.params.usuario.substr(1);
    let consulta = 'select distinct P.titulo from Proyeccion P, Reserva R where R.idProyeccion = P.idProyeccion AND R.idUsuario = ? AND P.titulo NOT IN (select titulo from Valoracion Where idUsuario = ?)'
    connection.query(consulta,[user,user],(err,rows) => {
        if (err){
            throw err
        } else {
            res.json(rows)
            res.end()
        }
    })
})

router.post('/valoracion',(req,res)=>{
    connection.query('INSERT INTO Valoracion (valoracion, idUsuario, titulo) VALUES(?,?,?)',[req.body.valoracion,req.body.idUsuario,req.body.titulo], (err,results,fields)=>{
        if (err) {
            throw err
        } else {
            console.log('Número de filas insertadas: ' + results.affectedRows)

        }
    })
})


export default router