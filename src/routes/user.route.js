import { Router } from "express";
import userController from "../controller/user.controller.js";

const UserRouter = Router()

UserRouter.post('/create', userController.createUser)


export default UserRouter