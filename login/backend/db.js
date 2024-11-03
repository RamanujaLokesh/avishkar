require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  max: process.env.DATABASE_CONNECTION_LIMIT,
});

let db = {};

// Get user by registration number
db.get_user_by_reg_no = (reg_no) => {
  const query = `SELECT reg_no, password FROM details WHERE reg_no = $1;`;
  return execute(query, [reg_no]);
};

// Get email by registration number for forgot password functionality
db.get_email_by_reg_no = (reg_no) => {
  const query = `SELECT clg_mail FROM details WHERE reg_no = $1;`;
  return execute(query, [reg_no]);
};

db.update_forgot_password_token = (reg_no, token) => {
  const createdAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 1000).toISOString();
  const query = `INSERT INTO reset_tokens (token, created_at, expires_at, reg_no) VALUES ($1, $2, $3, $4)`;
  return execute(query, [token, createdAt, expiresAt, reg_no]);
};

db.get_password_reset_token = (reg_no) => {
  const query = `SELECT token, expires_at FROM reset_tokens WHERE reg_no = $1 ORDER BY created_at DESC LIMIT 1;`;
  return execute(query, [reg_no]);
};

db.update_password_reset_token = (reg_no) => {
  const query = `DELETE FROM reset_tokens WHERE reg_no = $1;`;
  return execute(query, [reg_no]);
};

db.update_user_password = (reg_no, password) => {
  const query = `UPDATE details SET password = $1 WHERE reg_no = $2;`;
  return execute(query, [password, reg_no]);
};

const execute = (query, params) => {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (err, results) => {
      if (err) return reject(err);
      resolve(results.rows);
    });
  });
};

module.exports = db;
