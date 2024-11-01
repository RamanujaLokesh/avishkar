require("dotenv").config();
const { Pool } = require("pg");

// Create a new pool instance with connection parameters from environment variables
const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER, // Fixed typo
  password: process.env.DATABASE_PASSWORD, // Fixed typo
  database: process.env.DATABASE_NAME,
  max: process.env.DATABASE_CONNECTION_LIMIT || 10, 
});

let db = {};

// Get user by email
db.get_user_by_email = async (email) => {
  const query = "SELECT email, id FROM details WHERE email = $1";
  const values = [email];
  try {
    const result = await execute(query, values);
    return result.length > 0 ? result[0] : null; // Return the first user or null
  } catch (err) {
    console.error("Failed to get user by email:", err);
    throw err; // Rethrow to handle it upstream
  }
};

// Update forgot password token
db.update_forgot_password_token = async (id, token) => {
  const createdAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 1000).toISOString();
  const query = "INSERT INTO reset_tokens(token, created_at, expires_at, user_id) VALUES($1, $2, $3, $4)";
  const values = [token, createdAt, expiresAt, id];
  return execute(query, values);
};

// Get password reset token
db.get_password_reset_token = async (id) => {
  const query = "SELECT token, expires_at FROM reset_tokens WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1";
  const values = [id];
  return execute(query, values);
};

// Delete password reset token
db.update_password_reset_token = async (id) => {
  const query = "DELETE FROM reset_tokens WHERE user_id = $1";
  const values = [id];
  return execute(query, values);
};

// Update user password
db.update_user_password = async (id, password) => {
  const query = "UPDATE details SET password = $1 WHERE id = $2";
  const values = [password, id];
  return execute(query, values);
};

// Execute a query
const execute = async (query, values) => {
  try {
    const res = await pool.query(query, values);
    console.log("Query executed successfully:", res);
    return res.rows; // Return only the rows from the result
  } catch (err) {
    console.error("Query error:", err.stack);
    throw err; // Rethrow the error after logging it
  }
};

module.exports = db;