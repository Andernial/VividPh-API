import { connection } from "../database/connect.js";

const createUsersTable = () => {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Erro ao criar tabela users:', err.message);
        return;
      }
      console.log('Tabela users criada ou já existente.');
    });
  };
  
  export default createUsersTable;