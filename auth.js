const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');
const db = new Database('users.db');

// Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT
  )
`);

// Add admin user (run once)
const adminPassword = bcrypt.hashSync('admin123', 10);
db.prepare('INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)')
    .run('admin', adminPassword, 'admin');

module.exports = db;