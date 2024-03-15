const mysql = require('mysql');
require('dotenv').config();

const app = express();

// exports.handler = async (event) => {
  // try {
    // // Ne procéder que pour les requêtes POST
    // if (event.httpMethod !== 'POST') {
    //   return {
    //     statusCode: 405,
    //     body: JSON.stringify({ message: "Méthode non autorisée" }),
    //     body: JSON.stringify(event.httpMethod),
    //   };
    // }

    // if (!event.body) {
    //   return {
    //     statusCode: 400,
    //     body: JSON.stringify({ message: "Le corps de la requête est vide" })
    //   };
    // }

    // const body = JSON.parse(event.body);
    // const id = body.id;

    // Connexion à la base de données
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

    // console.log('ici');

    // // Connexion à la base de données
    // await new Promise((resolve, reject) => {
    //   conn.connect(err => {
    //     if (err) {
    //       reject({ statusCode: 500, message: "Erreur de connexion à la base de données" });
    //     } else {
    //       console.log('Connecté à la base de données MySQL!');
    //       resolve();
    //     }
    //   });
    // });

    // // Insertion dans la base de données
    // const insertSql = "INSERT INTO demandes_suppression (user_id, confirmation_code, status, created_at, updated_at) SELECT user_id, confirmation_code, 'pending', NOW(), NOW() FROM demandes_suppression WHERE id = ?";
    // await new Promise((resolve, reject) => {
    //   conn.query(insertSql, [id], (err, result) => {
    //     if (err) {
    //       reject({ statusCode: 500, message: "Erreur lors de l'insertion dans suivi_suppressions" });
    //     } else {
    //       resolve();
    //     }
    //   });
    // });

    // // Suppression de l'enregistrement
    // const deleteSql = "DELETE FROM demandes_suppression WHERE id = ?";
    // await new Promise((resolve, reject) => {
    //   conn.query(deleteSql, [id], (err, result) => {
    //     conn.end();
    //     if (err) {
    //       reject({ statusCode: 500, message: "Erreur lors de la suppression" });
    //     } else {
    //       resolve({ statusCode: 200, message: "Enregistrement supprimé avec succès" });
    //     }
    //   });
    // });

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

  // } catch (error) {
  //   return {
  //     statusCode: error.statusCode || 500,
  //     body: JSON.stringify({ message: error.message || "Une erreur inattendue s'est produite" })
  //   };
  // }
// };
