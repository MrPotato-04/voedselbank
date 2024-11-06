import mysql from "mysql2";


const connection = mysql.createConnection({
  host: "voedselbank-voedselbank.f.aivencloud.com",
  user: "avnadmin",
  password: process.env.DB_KEY,
  database: "voedselbank",
  port: 12565,
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the MySQL server");
  }
});

// // publicly declare the interface for typing
declare module "#app" {
    interface NuxtApp {
        $mysql: mysql.Connection
    }
}

export function getMysqlConnection(): mysql.Connection {
  return connection;
}
