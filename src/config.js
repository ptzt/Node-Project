require("dotenv").config()

const config = {
    host: process.env.HOST,
    database: process.env.DB,
    user: process.env.USER,
    password: process.env.PASSWORD

}

module.exports = config