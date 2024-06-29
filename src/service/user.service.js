import { connection } from "../database/connect.js";
import createUsersTable from "../entites/User.js";
import jwt from 'jsonwebtoken'
import { SECRET } from "../middlewares/verifyJwt.js";


class UserService {
  static CreateUserService(name, email, password, callback) {
    createUsersTable()

    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    connection.query(query, [name, email, password], (err, results) => {
      if (err) {
        return callback(err)
      }
      callback(null, results)
    })
  }

  static GetAllUserService(callback) {
    createUsersTable();

    const query = 'SELECT * FROM users';
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    })

  }

  static GetAllUserService(callback) {
    createUsersTable();

    const query = 'SELECT * FROM users';
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err)
      }
      callback(null, results)
    })

  }

  static Login(email, password, callback) {
    // Certifique-se de que a tabela de usuários está criada antes de executar a consulta
    createUsersTable();

    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

    connection.query(query, [email, password], (err, results) => {
      if (err) {
        return callback(err);
      }

      if (results.length === 0) {
        return callback(new Error('Usuário não encontrado'));
      }

      const userExists = results[0];

      const token = jwt.sign(
        { userid: userExists.id, role: 'user' },
        SECRET,
        { expiresIn: '10h' }
      );

      const object = {
        token: token,
        name: userExists.name,
        email: userExists.email,
        id: userExists.id,
        auth: true
      };

      callback(null, object);
    });
  }


  static UpdateUserService(id, name, password, email, callback) {
    createUsersTable();

    const userExists = 'SELECT * FROM users WHERE id = ?';

    connection.query(userExists, [id], (err, results) => {
      if (err) {
        return callback(err);
      }

      if (results.length === 0) {
        return callback(new Error("Usuário não encontrado"));
      }

      let fieldsToUpdate = [];
      let values = [];

      if (name) {
        fieldsToUpdate.push('name = ?');
        values.push(name);
      }
      if (password) {
        fieldsToUpdate.push('password = ?');
        values.push(password);
      }
      if (email) {
        fieldsToUpdate.push('email = ?');
        values.push(email);
      }

      values.push(id);

      const query = `UPDATE users SET ${fieldsToUpdate.join(', ')} WHERE id = ?`;

      connection.query(query, values, (err, results) => {
        if (err) {
          return callback(err);
        }

        connection.query(userExists, [id], (err, updatedResults) => {
          if (err) {
            return callback(err)
          }
          callback(null, updatedResults[0])
        })



      });
    });
  }

  static DeleteUserService(id, callback) {
    createUsersTable();

    const userExists = 'SELECT * FROM users WHERE id = ?';

    connection.query(userExists, [id], (err, results) => {
      if (err) {
        return callback(err);
      }

      if (results.length === 0) {
        return callback(new Error("Usuário não encontrado"));
      }

      const query = "DELETE FROM users WHERE id = ?";

      connection.query(query, [id], (err, results) => {
        if (err) {
          return callback(err);
        }
        callback(null, results);
      });
    });
  }

}

export default UserService;