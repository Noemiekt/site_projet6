const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3000;

// Configuration de body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à la base de données MySQL
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

conn.connect((err) => {
  if (err) throw err;
  console.log('Connecté à la base de données MySQL!');
});

app.post('/delete', (req, res) => {
  const id = req.body.id;
  const insertSql = "INSERT INTO demandes_suppression (user_id, confirmation_code, status, created_at, updated_at) SELECT user_id, confirmation_code, 'pending', NOW(), NOW() FROM demandes_suppression WHERE id = ?";

  conn.query(insertSql, [id], (err, result) => {
    if (err) {
      return res.send("Erreur lors de l'insertion dans suivi_suppressions: " + err);
    }

    const deleteSql = "DELETE FROM demandes_suppression WHERE id = ?";
    conn.query(deleteSql, [id], (err, result) => {
      if (err) {
        return res.send("Erreur lors de la suppression: " + err);
      }

      res.send("Enregistrement supprimé avec succès");
    });
  });
});

app.get('/delete', (req, res) => {
  // Logique pour afficher la page de suppression, par exemple :
  res.sendFile(path.join(__dirname, '/delete.html'));
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
