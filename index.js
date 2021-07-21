/**
 * Required External Modules
 */
 const path = require('path');
 const express = require('express');
 var mysql = require('mysql');
 var session = require('express-session');
 var bodyParser = require('body-parser');

/**
 * App Variables
 */
 const app = express();
 const port = process.env.PORT || "8000";

 var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'darryl1975',
	database : 'test'
});

/**
 *  App Configuration
 */
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

/**
 * Routes Definitions
 */
app.get("/hello", (req, res) => {
  res.status(200).send("simple portal: API call test successful");
});

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

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

app.get('/tellmore', function(req, res) {
  res.sendFile(__dirname + '/tellmore.html');
});

app.post("/tellmore", function(req, res) {
  insertData(req, res);
});


/**
 * Server Activation
 */
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });