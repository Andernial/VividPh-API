import { Router } from "express";
import userController from "../controller/user.controller.js";
import verifyJwt from "../middlewares/verifyJwt.js";


const UserRouter = Router()

UserRouter.post('/create',userController.createUser)
UserRouter.post('/create-pic',verifyJwt,userController.CreateProfilePic)
UserRouter.get('/show-all', userController.showAllUser)
UserRouter.post('/login', userController.login)
UserRouter.patch('/update/',verifyJwt, userController.updateUser)
UserRouter.delete('/delete',verifyJwt, userController.deleteUser)


export default UserRouter