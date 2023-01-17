const mysql = require('mysql');

const database = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'WikiShop',
    user: 'root',
    password: 'root'
});

database.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log("Connected to WikiShop database successfully.")
    }
})

module.exports = database;