import { Router } from "express";
import postController from "../controller/post.controller.js";
import verifyJwt from "../middlewares/verifyJwt.js";


const PostRouter = Router()

PostRouter.post('/create/',verifyJwt, postController.createPost)
PostRouter.get('/show-all', postController.showAllPost)
PostRouter.get('/showUser-post/:username', postController.showAllUserPosts)
PostRouter.patch('/update/:postId',verifyJwt, postController.updatePost)
PostRouter.delete('/delete/:postId',verifyJwt, postController.deletePostService)




export default PostRouter