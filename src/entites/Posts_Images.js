import { connection } from "../database/connect.js";

const createPostsImagesTable = () => {
    const query = `
   CREATE TABLE IF NOT EXISTS posts_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        post_id INT,
        image_id INT,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
        FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE CASCADE,
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

export default createPostsImagesTable;