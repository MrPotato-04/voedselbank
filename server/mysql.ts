import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: '34.90.109.250',
    user: 'root',
    password: 'Yajy]z#vD-(djRYH',
    database: 'voedselbank'
});

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the MySQL server');
    }
})

// // publicly declare the interface for typing
declare module "#app" {
    interface NuxtApp {
        $mysql: mysql.Connection
    }
}

export function getMysqlConnection(): mysql.Connection {
    return connection;
}