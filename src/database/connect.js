import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

const host = process.env.DB_HOST
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DATABASE

export const connection = mysql.createConnection({
  host: host,
  user: user,
  password,
  database: database
})

connection.connect()

export async function testConnection(){
    try {
        connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results[0].solution)
          });
          
       
    } catch (error) {
        connection.end();
        console.log(error)
    }
}
