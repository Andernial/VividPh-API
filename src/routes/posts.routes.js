import { Router } from "express";
import postController from "../controller/post.controller.js";


const PostRouter = Router()

PostRouter.post('/create/:userId', postController.createPost)



export default PostRouter