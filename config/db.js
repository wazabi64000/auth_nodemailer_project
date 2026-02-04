import mysql from "mysql2/promise";

import "dotenv/config";

let db ;

try {
   db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
await db.getConnection();
console.log("database connexion ", process.env.DB_HOST,  );
} catch (error) {
  console.error('Erreur lors del la connxion à la base de onnées ', error.message)
  process.exit(1)
}
 

export {db}


