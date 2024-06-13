import { connection } from "../database/connect.js";
import createUsersTable from "../entites/User.js";

class UserService {
  static CreateUserService(name, email, password, callback) {
    createUsersTable(); 
    
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    connection.query(query, [name, email, password], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  }
}

export default UserService;