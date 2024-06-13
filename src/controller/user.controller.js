import UserService from "../service/user.service.js"



const userController = {
    createUser: (req, res) => {
        const { name, email, password } = req.body

        UserService.CreateUserService(name,email,password, (err, results) => {
            if (err) {
              return res.status(500).send('Erro ao criar usuário');
            }
            res.status(201).json({results});
          });
    }
}

export default userController