var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_depewb',
  password        : '7950',
  database        : 'cs340_depewb'
});
module.exports.pool = pool;