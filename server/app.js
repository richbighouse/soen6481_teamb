const express = require('express')
const path = require('path');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Link with angular
var distDir = path.join(__dirname, "../client/dist/");
console.log("Using distDir -> ", distDir);
app.use(express.static(distDir));

// Database
const mysql = require('mysql2')
const db = mysql.createConnection({
  host: 'localhost',
  user: 'coviddbuser',
  password: '$soenpm!',
  database: 'covid'
})

// Start
app.listen(port, () => {
  console.log(`Covid19 Data Collection server listening at http://localhost:${port}`)
})

app.get("/api/status", function (req, res) {
  res.status(200).json({ status: "UP" });
});

app.post("/api/login", function (req, res) {
  console.log('Received login request ...');

  const body = req.body;
  console.log('email: ', body.email);
  console.log('password: ', body.password);

  const sql = `SELECT * FROM user WHERE email = '${body.email}' AND password = '${body.password}'`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    if (rows.length === 0) {
      res.status("401");
      res.send("Invalid Credentials");
    } else {
      res.json(rows);
    }    
  });
});

app.post("/api/register", function (req, res) {
  console.log('Received registration request ...', req.body);

  res.status(200).json({ status: "UP" });
});


//module.exports = app;

