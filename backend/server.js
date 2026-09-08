const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');       // ← NUOVO
const db = require('./database');        // ← NUOVO

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.delete('/users/:username', (req, res) => {
  const { username } = req.params;

  const user = db
    .prepare('SELECT * FROM users WHERE username = ?')
    .get(username);

  if (!user) {
    return res.status(404).json({
      error: 'Utente non trovato.'
    });
  }

  db
    .prepare('DELETE FROM users WHERE username = ?')
    .run(username);

  res.json({
    success: true,
    message: 'Utente eliminato con successo.'
  });
});

// ← NUOVA ROUTE
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // 1. Validazione base: campi presenti?
  if (!username || !password) {
    return res.status(400).json({ error: 'Username e password sono obbligatori.' });
  }

  // 2. Cerchiamo l'utente nel database
  const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
  const user = stmt.get(username);

  if (!user) {
    // Utente non trovato
    return res.status(401).json({ error: 'Username o password errati.' });
  }

  // 3. Confrontiamo la password inviata con l'hash salvato
  const passwordCorretta = await bcrypt.compare(password, user.password_hash);

  if (!passwordCorretta) {
    return res.status(401).json({ error: 'Username o password errati.' });
  }

  // 4. Tutto ok!
  res.json({ success: true, message: 'Login effettuato con successo.' });
});

app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});

app.post('/users', async (req, res) => {
  const { username, password } = req.body;

  // 1. Controlliamo che username e password siano presenti
  if (!username || !password) {
    return res.status(400).json({
      error: 'Username e password sono obbligatori.'
    });
  }

  // 2. Controlliamo se l'username esiste già
  const userEsistente = db
    .prepare('SELECT * FROM users WHERE username = ?')
    .get(username);

  if (userEsistente) {
    return res.status(409).json({
      error: 'Username già esistente.'
    });
  }

  // 3. Creiamo l'hash della password
  const passwordHash = await bcrypt.hash(password, 10);

  // 4. Inseriamo il nuovo utente nel database
  const stmt = db.prepare(`
    INSERT INTO users (username, password_hash)
    VALUES (?, ?)
  `);

  stmt.run(username, passwordHash);

  // 5. Rispondiamo al frontend
  res.status(201).json({
    success: true,
    message: 'Account creato con successo.'
  });
});