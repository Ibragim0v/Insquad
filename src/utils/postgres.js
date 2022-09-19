const { Pool } = require("pg");
const connection = require("./config");

// Connecting to Database

const pool = new Pool({
  connectionString: connection.connectionStringPro,
});

// FetchData returns an array

const fetchData = async (SQL, ...params) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(SQL, params.length ? params : null);
    return rows;
  } finally {
    client.release();
  }
};

// FetchRow returns an object

const fetchRow = async (SQL, ...params) => {
  const client = await pool.connect();
  try {
    const {
      rows: [row],
    } = await client.query(SQL, params.length ? params : null);
    return row;
  } finally {
    client.release();
  }
};

module.exports = {
  fetchData,
  fetchRow,
};
