import express from 'express'
import connection from '../config/connectDB'
import md5 from 'md5'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/', (req,res) => {
    connection.query('SELECT * FROM Usuario WHERE email=? AND psw=?', [req.body.username,md5(req.body.password)], (err,rows) => {
        if (err) {
            throw err
        } else {
            if (rows.length == 1){
                const payload = {
                    check:  true
                }
                const token = jwt.sign(payload, 'secretpasword', {
                    expiresIn: 1440
                })
                res.json({
                    mensaje: 'Autenticación correcta',
                    nombre: rows[0]['nombre'],
                    idUsuario: rows[0]['idUsuario'],
                    role: rows[0]['administrador'],
                    token: token
                })
            } else {
                res.json({ 
                    mensaje: "Usuario o contraseña incorrectos",
                    token: "No"
                })
            }
        }
    })
})

router.get('/', (req,res) => {
    
    connection.query('SELECT * FROM Usuario', (err,rows) => {
        if (err) {
            throw err
        } else {
            res.json(rows)
            res.end()
        }
    })
})

export default router