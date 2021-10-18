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

// User Types -> we should get this from the db, but we can hardcode for now
const userTypes = {
  "patient": 1,
  "doctor": 2,
  "nurse": 3,
  "manager": 4
};

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
  const request = req.body.registrationRequest;
  console.log('Received registration request ...', request);

  // patients are automatically approved. Doctors and Nurses require approval;
  var approved = 0;
  if (userTypes[request.userType] === 'patient') {
    approved = 1;
  }

  const regNumber = null;
  if (request.registrationNumber) {
    regNumber = "'" + request.registrationNumber + "'";
  }

  const sql = `INSERT INTO user (
    fullName,
    address,
    dateOfBirth,
    phoneNumber,
    email,
    password,
    fkUserType,
    registrationDate,
    lastLoginDate,
    active,
    approved,
    registrationNumber) VALUES (
     '${request.fullName}',
     '${request.address}',
     '${request.dateOfBirth}',
     '${request.phoneNumber}',
     '${request.email}',
     '${request.password}',
      ${userTypes[request.userType]},
      '${getTodayDate()}',
      null,
      1,
      ${approved},
      ${regNumber}
    )`;

    console.log(sql);

  db.query(sql, (err, rows) => {
    if (err) throw err;
    if (rows.length === 0) {
      res.status("500");
      res.send("Server Error during Registration.");
    } else {
      console.log(rows);
      res.status(201).json(rows);
    }    
  });
});

  


function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

// module.exports = app;

