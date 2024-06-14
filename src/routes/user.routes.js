import { Router } from "express";
import userController from "../controller/user.controller.js";

const UserRouter = Router()

UserRouter.post('/create', userController.createUser)
UserRouter.get('/show-all', userController.showAllUser)
UserRouter.patch('/update/:id', userController.updateUser)
UserRouter.delete('/delete/:id', userController.deleteUser)


export default UserRouter