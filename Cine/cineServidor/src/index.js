import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import router from './router'

const app = express()
app.disable('x-powered-by')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers",
      "Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR")
    if (req.headers.origin) {
      res.header('Access-Control-Allow-Origin', req.headers.origin)
    }
    if (req.method === 'OPTIONS') {
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")
      return res.status(200).json({})
    }
    next()
})

router(app)

app.listen('9000',() => {
   console.log('Servidor arrancado en http://localhost:9000')
})