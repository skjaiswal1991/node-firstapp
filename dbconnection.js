// var mysql = require('mysql');

// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'timer'
// });

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

  
// module.exports = connection;

const util = require('util')
const mysql = require('mysql')
const pool = mysql.createPool({
  connectionLimit: 500,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'timer'
})

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
  }

  if (connection) connection.release()

  return
})

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query)

module.exports = pool



// var mysql = require('mysql');
// var util = require('util')
// var connection = mysql.createPool({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'timer'
// });



// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

// connection.query = util.promisify(connection.query)
  
// module.exports = connection;

