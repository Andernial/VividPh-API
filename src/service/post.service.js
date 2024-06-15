import createImagesTable from "../entites/Image.js";
import createPostsTable from "../entites/Post.js";
import createPostsImagesTable from "../entites/Posts_Images.js";
import { connection } from "../database/connect.js";

class PostService {
  static CreatePostService(userId,imageId, title, youtubeUrl, callback) {
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
          connection.query(selectPostQuery,[insertedId], (err,results)=>{
            if(err){
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

}

export default PostService