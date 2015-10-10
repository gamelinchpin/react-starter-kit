'use strict';

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '46.37.182.203',
    user     : 'dan',
    password : 'approved2010',
    database : 'approvedfood'
});

module.exports = {
  q: sql_query => new Promise((resolve, reject) => {
      console.log("q: " + sql_query);
      connection.connect(function(err) {
          if (err) {
            reject(err);
          }
      });
      connection.query(sql_query, function(err, rows) {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
  }),
  query: function(sql_query) {
    console.log("query: " + sql_query);
    connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }

    });
    return connection.query(sql_query, function(err, rows) {
      if (err) {
        console.log(err.code);
        console.log(err.fatal);
        return [];
      }
      return rows;
    });
  }
};
