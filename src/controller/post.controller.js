import PostService from "../service/post.service.js";



const postController = {
  createPost: (req, res) => {
    const { userId } = req.params
    const { url, publicId, youtubeUrl, title } = req.body
    console.log(userId,'funciona no controller')
    PostService.CreateImageService(url, publicId, (err, results) => {
      if (err) {
        return res.status(400).send('Erro ao criar imagem');
      }
      PostService.CreatePostService(userId,results.id, title, youtubeUrl, (err, results) => {
        if (err) {
          return res.status(400).send(err)
        }
        res.status(200).json({ results })
      })
    })
  },

  showAllPost: (req,res) =>{
    PostService.GetAllPostService((err,results)=> {
      if(err){
        return res.status(400).json(err.message)
      }
       res.status(200).json({ results })

    })
  },

  updatePost: (req, res) => {
    const { postId } = req.params
    const { url, publicId,title,youtubeUrl} = req.body
    PostService.CreateImageService(url, publicId, (err, results) => {
      if (err) {
        return res.status(400).send('Erro ao criar imagem');
      }
      PostService.UpdatePostImage(postId, results.id, (err, results) => {
        if (err) {
          return res.status(400).send(err)
        }
        PostService.UpdatePostService(postId,title,youtubeUrl, (err,results) => {
          if (err) {
            return res.status(400).send(err)
          }
          res.status(200).json({ results })
        })
      })
    })
  },

  deletePostService: (req, res) => {
    const { postId } = req.params

      PostService.DeletePostService(postId, (err, results) => {
        if (err) {
          return res.status(400).send(err)
        }
        res.status(200).json({ results })
      })
  },

}

export default postController