const { createPool } = require("mysql");
require("dotenv").config();
// const pool = createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
// });

const pool = createPool({
  host: "eu-cdbr-west-01.cleardb.com",
  user: "bc087d96458fe2",
  database: "heroku_32b8b9766107a00",
  password: "d212553f",
});

pool.query("SET time_zone = '+00:00'");

// pool.query(
//   "SELECT id_user,name,password,email,phoneNumber,privilege from users",
//   (error, result) => {
//     if (error) console.log(error);
//     console.log(result);
//   }
// );

module.exports = pool;
