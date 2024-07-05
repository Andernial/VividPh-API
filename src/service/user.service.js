import { connection } from "../database/connect.js";
import createUsersTable from "../entites/User.js";
import jwt from 'jsonwebtoken'
import { SECRET } from "../middlewares/verifyJwt.js";
import createProfilePicsTable from "../entites/Profile_Pics.js";


class UserService {
  static CreateUserService(name, email, password, callback) {
    createUsersTable();
    createProfilePicsTable();

    const checkNameQuery = 'SELECT * FROM users WHERE name = ?';
    connection.query(checkNameQuery, [name], (err, nameResults) => {
      if (err) {
        return callback(err);
      }

      if (nameResults.length > 0) {
        return callback(new Error('Nome de usuário já está em uso'));
      }

      const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
      connection.query(checkEmailQuery, [email], (err, emailResults) => {
        if (err) {
          return callback(err);
        }

        if (emailResults.length > 0) {
          return callback(new Error('Email já está em uso'));
        }

        const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        connection.query(insertQuery, [name, email, password], (err, results) => {
          if (err) {
            return callback(err);
          }
          callback(null, results);
        });
      });
    });
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

  static GetUserByNameService(name, callback) {
    createUsersTable();
    createProfilePicsTable();

    const query = 'SELECT name, description, id FROM users WHERE name = ?';
    
    connection.query(query, [name], (err, userResults) => {
        if (err) {
            return callback(err);
        }

        if (userResults.length === 0) {
            return callback(new Error('Usuário não encontrado'));
        }

        const user = userResults[0];

        const profilePicQuery = 'SELECT publicId, url FROM profile_pics WHERE user_id = ?';
        
        connection.query(profilePicQuery, [user.id], (err, profilePicResults) => {
            if (err) {
                return callback(err);
            }

            if (profilePicResults.length > 0) {
                user.profilePic = profilePicResults[0];
            }

            delete user.id;

            callback(null, user);
        });
    });
}

static CreateProfilePicService(userId, publicId, url, callback) {
  createUsersTable();
  createProfilePicsTable();

  const checkExistingQuery = 'SELECT id FROM profile_pics WHERE user_id = ?';
  connection.query(checkExistingQuery, [userId], function (err, existingResult) {
      if (err) {
          return callback(err);
      }

      if (existingResult.length > 0) {
          const deleteQuery = 'DELETE FROM profile_pics WHERE user_id = ?';
          connection.query(deleteQuery, [userId], function (err, deleteResult) {
              if (err) {
                  return callback(err);
              }
              insertProfilePic(userId, publicId, url, callback);
          });
      } else {
          insertProfilePic(userId, publicId, url, callback);
      }
  });

  function insertProfilePic(userId, publicId, url, callback) {
      const insertQuery = 'INSERT INTO profile_pics(user_id, publicId, url) VALUES (?, ?, ?)';
      
      connection.query(insertQuery, [userId, publicId, url], function (err, insertResult) {
          if (err) {
              return callback(err);
          }

          const selectQuery = `
          SELECT u.name AS user_name, pp.publicId, pp.url, pp.created_at, pp.updated_at
          FROM profile_pics pp
          JOIN users u ON pp.user_id = u.id
          WHERE pp.user_id = ? AND pp.publicId = ?
          `;

          connection.query(selectQuery, [userId, publicId], function (err, selectResult) {
              if (err) {
                  return callback(err);
              }

              const row = selectResult && selectResult.length > 0 ? selectResult[0] : null;
              callback(null, row);
          });
      });
  }
}






  static Login(email, password, callback) {
    createProfilePicsTable();
    createUsersTable();

    const userQuery = 'SELECT * FROM users WHERE email = ? AND password = ?';

    connection.query(userQuery, [email, password], (err, results) => {
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

      const profilePicQuery = 'SELECT publicId, url FROM profile_pics WHERE user_id = ?';

      connection.query(profilePicQuery, [userExists.id], (err, picResults) => {
        if (err) {
          return callback(err);
        }

        if (picResults.length > 0) {
          object.profilePic = {
            publicId: picResults[0].publicId,
            url: picResults[0].url
          };
        }

        callback(null, object);
      });
    });
  }


  static UpdateUserService(id, name, password, email, description, callback) {
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

      if (description) {
        fieldsToUpdate.push('description = ?');
        values.push(description);
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