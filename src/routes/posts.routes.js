import { Router } from "express";
import postController from "../controller/post.controller.js";


const PostRouter = Router()

PostRouter.post('/create/:userId', postController.createPost)
PostRouter.get('/show-all', postController.showAllPost)




export default PostRouter