import createImagesTable from "../entites/Image.js";
import createPostsTable from "../entites/Post.js";
import createPostsImagesTable from "../entites/Posts_Images.js";
import { connection } from "../database/connect.js";
import createUsersTable from "../entites/User.js";

class PostService {
  static CreatePostService(userId, imageId, title, youtubeUrl, callback) {
    createPostsTable()
    createPostsImagesTable()


    const query = 'INSERT INTO posts (user_id, title, urlYoutube) VALUES (?, ?, ?)'
    const relationQuery = 'INSERT INTO posts_images (post_id,image_id) VALUES (?, ?)'
    const selectPostQuery = `
    SELECT p.id, p.title, p.urlYoutube, i.id AS image_id, i.publicId, i.url, u.name AS user_name
    FROM posts p
    JOIN posts_images pi ON p.id = pi.post_id
    JOIN images i ON pi.image_id = i.id
    JOIN users u ON p.user_id = u.id
    WHERE p.id = ?
  `;
    connection.query(query, [userId, title, youtubeUrl], (err, results) => {

      if (err) {
        return callback(err)
      }

      const insertedId = results.insertId

      connection.query(relationQuery, [insertedId, imageId], (err, results) => {
        if (err) {
          return callback(err)
        }
        connection.query(selectPostQuery, [insertedId], (err, results) => {
          if (err) {
            return callback(err)
          }

          const post = {
            id: results[0].id,
            title: results[0].title,
            urlYoutube: results[0].urlYoutube,
            user_name: results[0].user_name,
            images: results.map(row => ({
              image_id: row.image_id,
              public_id: row.publicId,
              url: row.url
            }))
          };

          callback(null, post)
        })
      })

    })
  }

  static CreateImageService(url, publicId, callback) {
    createImagesTable()


    connection.beginTransaction(err => {
      if (err) {
        return callback(err)
      }

      const insertQuery = 'INSERT INTO images (url, publicId) VALUES (?, ?)'
      const selectQuery = 'SELECT * FROM images WHERE id = ?'

      connection.query(insertQuery, [url, publicId], (err, results) => {
        if (err) {
          connection.rollback(() => {
            callback(err)
          })
          return
        }

        const insertedId = results.insertId


        connection.query(selectQuery, [insertedId], (err, image) => {
          if (err) {
            connection.rollback(() => {
              callback(err)
            })
            return
          }

          connection.commit(err => {
            if (err) {
              connection.rollback(() => {
                callback(err)
              })
              return
            }
            callback(null, image[0])
          })
        })
      })
    })
  }

  static GetAllPostService(callback) {
    createUsersTable()
    createPostsTable()
    createImagesTable()
    createPostsImagesTable()

    const query = `SELECT 
    p.id AS post_id,
    p.title AS post_title,
    p.urlYoutube AS post_youtube_url,
    i.id AS image_id,
    i.publicId AS image_public_id,
    i.url AS image_url,
    u.name AS user_name
    FROM 
    posts p
    JOIN posts_images pi ON p.id = pi.post_id
    JOIN images i ON pi.image_id = i.id
    JOIN users u ON p.user_id = u.id;`;
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err)
      }

      if (results.length === 0) {
        return callback(new Error("Nenhum post encontrado"));
      }

      callback(null, results)
    })

  }

  static ShowUserPosts(username,callback) {
    createUsersTable()
    createPostsTable()
    createImagesTable()
    createPostsImagesTable()

    const query = `
  SELECT 
    p.id AS post_id,
    p.title AS post_title,
    p.urlYoutube AS post_youtube_url,
    i.id AS image_id,
    i.publicId AS image_public_id,
    i.url AS image_url,
    u.name AS user_name
  FROM 
    posts p
    JOIN posts_images pi ON p.id = pi.post_id
    JOIN images i ON pi.image_id = i.id
    JOIN users u ON p.user_id = u.id
  WHERE
    u.name = ?;`;


    connection.query(query,[username], (err, results) => {
      if (err) {
        return callback(err)
      }

      if (results.length === 0) {
        return callback(new Error("Nenhum post encontrado"));
      }

      callback(null, results)
    })

  }




  static UpdatePostService(postId, title, youtubeUrl, callback) {
    createUsersTable()
    createPostsTable()
    createImagesTable()
    createPostsImagesTable()

    const postExists = `
    SELECT 
        p.id AS post_id,
        p.title AS post_title,
        p.urlYoutube AS post_youtube_url,
        i.id AS image_id,
        i.publicId AS image_public_id,
        i.url AS image_url
    FROM 
        posts p
        JOIN posts_images pi ON p.id = pi.post_id
        JOIN images i ON pi.image_id = i.id
    WHERE 
        p.id = ?
`;

    connection.query(postExists, [postId], (err, results) => {
      if (err) {
        return callback(err);
      }

      if (results.length === 0) {
        return callback(new Error("Post não encontrado"));
      }

      let fieldsToUpdate = [];
      let values = [];

      if (title) {
        fieldsToUpdate.push('title = ?');
        values.push(title);
      }
      if (youtubeUrl) {
        fieldsToUpdate.push('urlYoutube = ?');
        values.push(youtubeUrl);
      }

      values.push(postId);

      const query = `UPDATE posts SET ${fieldsToUpdate.join(', ')} WHERE id = ?`;

      connection.query(query, values, (err, results) => {
        if (err) {
          return callback(err);
        }

        connection.query(postExists, [postId], (err, updatedResults) => {
          if (err) {
            return callback(err)
          }

          const updatedPost = {
            id: updatedResults[0].post_id,
            title: updatedResults[0].post_title,
            urlYoutube: updatedResults[0].post_youtube_url,
            image: {
                id: updatedResults[0].image_id,
                publicId: updatedResults[0].image_public_id,
                url: updatedResults[0].image_url
            }
        };

          callback(null, updatedPost)
        })



      });
    });
  }

  static UpdatePostImage(postId, newImageId, callback) {
    createUsersTable()
    createPostsTable()
    createImagesTable()
    createPostsImagesTable()
    const selectQuery = `SELECT image_id FROM posts_images WHERE post_id = ?`;

    connection.query(selectQuery, [postId], (err, results) => {
      if (err) {
        return callback(err);
      }

      if (results.length === 0) {
        return callback(new Error("Nenhuma imagem encontrada para este post."));
      }

      const oldImageId = results[0].image_id;

      const deleteQuery = `DELETE FROM posts_images WHERE post_id = ?`;

      connection.query(deleteQuery, [postId], (err, deleteResults) => {
        if (err) {
          return callback(err);
        }

        const deleteImageQuery = `DELETE FROM images WHERE id = ?`;

        connection.query(deleteImageQuery, [oldImageId], (err, deleteImageResults) => {
          if (err) {
            return callback(err);
          }

          const insertQuery = `INSERT INTO posts_images (post_id, image_id) VALUES (?, ?)`;

          connection.query(insertQuery, [postId, newImageId], (err, insertResults) => {
            if (err) {
              return callback(err);
            }

            callback(null, newImageId);
          });
        });
      });
    });
  }

  static DeletePostService(postId, callback) {
    createUsersTable()
    createPostsTable()
    createImagesTable()
    createPostsImagesTable()

    const postExists = 'SELECT * FROM posts WHERE id = ?';

    connection.query(postExists, [postId], (err, results) => {
      if (err) {
        return callback(err);
      }

      if (results.length === 0) {
        return callback(new Error("Usuário não encontrado"));
      }

      const query = "DELETE FROM posts WHERE id = ?";

      connection.query(query, [postId], (err, results) => {
        if (err) {
          return callback(err);
        }
        callback(null, results);
      });
    });
  }

}

export default PostService