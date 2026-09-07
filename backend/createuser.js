const bcrypt = require('bcrypt');
const db = require('./database');

const username = '';
const plainPassword = ''; // cambiala pure con quella che vuoi tu

const SALT_ROUNDS = 10;

async function creaUtente() {
  const passwordHash = await bcrypt.hash(plainPassword, SALT_ROUNDS);

  const stmt = db.prepare(
    'INSERT INTO users (username, password_hash) VALUES (?, ?)'
  );
  stmt.run(username, passwordHash);

  console.log(`Utente "${username}" creato con successo.`);
  console.log('Hash generato:', passwordHash);
}

creaUtente();