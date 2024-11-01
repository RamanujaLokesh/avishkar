require("dotenv").config();

const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABSE_USER,
  password: process.env.DATABSE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: process.env.DATABASE_CONNECTION_LIMIT,
});

let db = {};

db.get_user_by_email = (email) => {
  const query = `SELECT email, id from details WHERE email = "${email}";`;
  return execute(query);
};

db.update_forgot_password_token = (id, token) => {
  const createdAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 1000).toISOString();
  const query = `INSERT INTO reset_tokens(token, created_at, expires_at, user_id) VALUES('${token}', '${createdAt}', '${expiresAt}', ${id})`;
  return execute(query);
};

db.get_password_reset_token = (id) => {
  const query = `SELECT token, expires_at from reset_tokens WHERE user_id = ${id} ORDER BY created_at DESC LIMIT 1;`;
  return execute(query);
};

db.update_password_reset_token = (id) => {
  const query = `DELETE FROM reset_tokens WHERE user_id = ${id}`;
  return execute(query);
};

db.update_user_password = (id, password) => {
  const query = `UPDATE details SET password = '${password}' WHERE id = ${id}`;
  return execute(query);
};

const execute = (query) => {
  return new Promise((resolve, reject) => {
    pool.query(query, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

module.exports = db;