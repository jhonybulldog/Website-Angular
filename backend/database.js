const Database = require('better-sqlite3');

// Apre (o crea, se non esiste) il file data.db nella cartella corrente
const db = new Database('data.db');

// Crea la tabella "users" solo se non esiste già
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log('Database pronto: tabella "users" creata (o già esistente).');

module.exports = db;