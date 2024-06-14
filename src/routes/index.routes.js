import { Router } from "express"
import UserRouter from "./user.routes.js"

const routers = Router()


routers.use("/user", UserRouter)

export default routers