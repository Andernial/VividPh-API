import PostService from "../service/post.service.js";



const postController = {
  createPost: (req, res) => {
    const userId = req.userid
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

  showAllUserPosts: (req,res) =>{
     const {username} = req.params
    PostService.ShowUserPosts(username,(err,results)=> {
      if(err){
        return res.status(400).json(err.message)
      }
       res.status(200).json({ results })

    })
  },

  updatePost: (req, res) => {
    const  userId = req.userid;
    const { postId } = req.params;
    const { url, publicId, title, youtubeUrl } = req.body;
  
    // Verifica se o post existe
    PostService.SearchPost(userId, postId, (err, post) => {
      if (err) {
        return res.status(400).json({err});
      }
  
      if (!post) {
        return res.status(404).send('Post não encontrado');
      }
  
      // Cria a imagem
      PostService.CreateImageService(url, publicId, (err, imageResult) => {
        if (err) {
          return res.status(400).send('Erro ao criar imagem');
        }
  
        // Atualiza a imagem do post
        PostService.UpdatePostImage(postId, imageResult.id, (err, imageUpdateResult) => {
          if (err) {
            return res.status(400).send('Erro ao atualizar imagem do post');
          }
  
          // Atualiza os dados do post
          PostService.UpdatePostService(postId, title, youtubeUrl, (err, postUpdateResult) => {
            if (err) {
              return res.status(400).send('Erro ao atualizar post');
            }
  
            res.status(200).json({ postUpdateResult });
          });
        });
      });
    });
  },

  deletePostService: (req, res) => {
    const userid = req.userid
    const { postId } = req.params

  

      PostService.DeletePostService(userid,postId, (err, results) => {
        if (err) {
          return res.status(400).json(err.message)
        }
        res.status(200).json({ message: "post deletado com sucesso!" })
      })
  },

}

export default postController