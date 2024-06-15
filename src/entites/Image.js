import { connection } from "../database/connect.js";

const createImagesTable = () => {
    const query = `
   CREATE TABLE IF NOT EXISTS images (
        id INT AUTO_INCREMENT PRIMARY KEY,
         url VARCHAR(100) NOT NULL,
         publicId VARCHAR(100) NOT NULL,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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

export default createImagesTable;