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