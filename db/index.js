require("dotenv").config();
const { Pool } = require("pg");

let dbParams;

if (process.env.DATABASE_URL) {
  dbParams = {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
  };
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  };
}

const pool = new Pool(dbParams);

pool
  .connect()
  .catch((e) => console.log(`Error connecting to Postgres server:\n${e}`));

module.exports = pool;
