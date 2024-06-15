import PostService from "../service/post.service.js";



const postController = {
  createPost: (req, res) => {
    const { userId } = req.params
    const { url, publicId, youtubeUrl, title } = req.body
    console.log(userId,'funciona no controller')
    PostService.CreateImageService(url, publicId, (err, results) => {
      if (err) {
        return res.status(500).send('Erro ao criar imagem');
      }
      PostService.CreatePostService(userId,results.id, title, youtubeUrl, (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(201).json({ results });
      })
    })
  },


}

export default postController