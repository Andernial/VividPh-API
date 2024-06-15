import { Router } from "express"
import UserRouter from "./user.routes.js"
import PostRouter from "./posts.routes.js"

const routers = Router()


routers.use("/user", UserRouter)
routers.use("/post", PostRouter)

export default routers