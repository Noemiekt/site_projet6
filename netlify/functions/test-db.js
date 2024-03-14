const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(err => {
  if (err) {
    console.error('Erreur de connexion : ' + err.stack);
    return;
  }

  console.log('Connecté avec succès à la base de données. ID de connexion : ' + connection.threadId);
});

// Fermez la connexion après le test
connection.end();
