import express from 'express'
import dotenv from 'dotenv'
import { testConnection } from './database/connect.js'
import UserRouter from './routes/user.route.js'
const App = express()
const port = 3000

dotenv.config()
App.use(express.json())

App.use(UserRouter)

App.listen(port,()=>{
    testConnection()
    console.log('servidor criado com sucesso')
})