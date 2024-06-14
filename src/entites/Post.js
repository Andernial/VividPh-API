import { connection } from "../database/connect.js";

const createPostsTable = () => {
    const query = `
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        urlYoutube VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Erro ao criar tabela posts:', err.message);
        return;
      }
    });
  };
  
  export default createPostsTable;