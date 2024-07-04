import { connection } from "../database/connect.js";

const createProfilePicsTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS profile_pics (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      publicId VARCHAR(100) NOT NULL,
      url VARCHAR(100) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao criar tabela profile_pics:', err.message);
      return;
    }
  });
};

export default createProfilePicsTable;