import UserService from "../service/user.service.js"



const userController = {
  createUser: (req, res) => {
    const { name, email, password } = req.body

    UserService.CreateUserService(name, email, password, (err, results) => {
      if (err) {
        return res.status(500).send('Erro ao criar usuário');
      }
      res.status(201).json({  message: 'Usuário criado com sucesso!' })
    })
  },

  showAllUser: (req, res) => {

    UserService.GetAllUserService((err, results) => {
      if (err) {
        return res.status(400).send('Erro ao buscar usuários')
      }
      res.status(200).json({results})
    })
  },

  updateUser: (req, res) => {
    const { id } = req.params
    const { name, password, email } = req.body
    console.log(id)

    if (!name && !password && !email){return res.status(400).json({message: 'Nenhum valor a ser alterado'})}

      UserService.UpdateUserService(id,name,password,email, (err, results) => {
        if (err) {
          return res.status(400).json({message: err.message})
        }
        res.status(200).json({ results })
      })
  },

  deleteUser: (req, res) => {
    const { id } = req.params
    console.log(id)

      UserService.DeleteUserService(id, (err, results) => {
        if (err) {
          return res.status(400).send(err)
        }
        res.status(200).json({ message:"usuário deletado com sucesso!" })
      })
  },


}

export default userController