import usuarios from './routes/usuarios'
import tarifas from './routes/tarifas'
import cartelera from './routes/cartelera'
import sesion from './routes/sesion'
import reserva from './routes/reserva'
import valoracion from './routes/valoracion'

export default app => {
    app.use('/usuarios', usuarios)
    app.use('/tarifas', tarifas)
    app.use('/cartelera', cartelera)
    app.use('/sesion',sesion)
    app.use('/reserva',reserva)
    app.use('/valoracion', valoracion)
}