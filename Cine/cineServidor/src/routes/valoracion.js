import express from 'express'
import connection from '../config/connectDB'

/**
 * @type {express}
 */
const router = express.Router()

/** 
 * @description Obtiene la media de las valoraciones agrupadas por película 
 * 
*/
router.get('/', (req,res) =>{
    
    connection.query('SELECT titulo, AVG(valoracion) AS media FROM Valoracion GROUP BY titulo', (err,rows) => {
        if (err) {
            throw err
        } else {
            res.json(rows)
            res.end()
        }
    })
})

export default router