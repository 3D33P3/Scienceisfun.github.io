import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise();

export async function getblackholes(query) {
  try {
    let sql = 'SELECT * FROM blackholes';
    let params = [];

    if (query) {
      sql += ' WHERE title LIKE ? OR content LIKE ?';
      params = [`%${query}%`, `%${query}%`];
    }

    const [rows] = await pool.query(sql, params);
    return rows;
  } catch (err) {
    console.error('Database error:', err);
    throw err;
  }
}