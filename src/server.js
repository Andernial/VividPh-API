import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { testConnection } from './database/connect.js'
import routers from './routes/index.routes.js'
const App = express()
const port = 3000

dotenv.config()
App.use(express.json())
App.use(cors())
App.use(routers)

App.listen(port,()=>{
    testConnection()
    console.log('servidor criado com sucesso')
})