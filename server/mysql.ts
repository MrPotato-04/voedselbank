import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "voedselbank-voedselbank.a.aivencloud.com",
  user: "avnadmin",
  password: "AVNS_dKIsSTyk8Jby6v9_o9G",
  database: "defaultdb",
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
