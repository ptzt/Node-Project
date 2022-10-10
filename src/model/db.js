require("dotenv").config()

const mysql = require("promise-mysql");

const connection = mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DB,
    user: process.env.USER,
    password: process.env.PASSWORD
});

const getConnection = () => {
    return connection;
};

module.exports = getConnection