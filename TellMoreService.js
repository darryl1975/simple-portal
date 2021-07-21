'use strict';
var dbConn = require('db.config');

function insertData(req, res) {
    // store all the input data from form
    const formDetails=req.body;
  
    let sql = "INSERT INTO tellmore SET ?";
  
    let query = connection.query(sql, formDetails, (err) => {
      if (err) {
        throw err;
      }
      console.log('Record inserted successfully...');
      res.redirect('/');
    })
  }
  