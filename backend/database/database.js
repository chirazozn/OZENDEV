const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'gateway01.eu-central-1.prod.aws.tidbcloud.com',
  port: 4000,
  user: 'tbdRXVuaY9SEoGL.root',
  password: 'tR5XzCGHYYH8RFrg', // remplace avec ton mot de passe généré
  database: 'test',
  ssl: {
    ca: require('fs').readFileSync('./certs/tidb-server-ca.pem') // ou le chemin absolu vers le .pem
  }
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à TiDB:', err);
  } else {
    console.log('Connecté à TiDB Serverless !');
  }
});
