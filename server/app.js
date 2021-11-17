const express = require('express')
const sessions = require('express-session')
const path = require('path');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Link with angular
var distDir = path.join(__dirname, "../client/dist/");
console.log("Using distDir -> ", distDir);
app.use(express.static(distDir));

// Session
app.use(sessions({
  secret: 'super duper secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

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

/*
  currentUser - will need a better solution eventually. This only supports a single user
  look into express-session, cookie-session, passportjs, or a homemade localStorage solution
*/ 
var currentUser = null;

// Start
app.listen(port, () => {
  console.log(`Covid19 Data Collection server listening at http://localhost:${port}`)
})

// Login
app.post("/api/login", function (req, res) {
  console.log('Received login request ...', req.body);
  const body = req.body;

  const sql = `SELECT * FROM user WHERE email = '${body.email}' AND password = '${body.password}'`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(400).send(err.sqlMessage);
    } else if (rows.length === 0) {
      console.log("Invalid Credentials");
      res.status("401");
      res.send("Invalid Credentials");
    } else {
      currentUser = rows[0];
      var session=req.session;
      session.userid = currentUser.id;
      console.log("Login succesful");
      res.json(currentUser);
    }    
  });
});

// Logout
app.get("/api/logout", function (req, res) {
  const currentId = req.session.userid;
  console.log(`Received logout request for userid ${currentId} ...`);

  req.session.destroy(() => {
    console.log('User logged out.')
    res.status(200).send();
  })
});

// Register
app.post("/api/register", function (req, res) {
  const request = req.body.registrationRequest;
  console.log('Received registration request ...', request);

  // patients are automatically approved. Doctors and Nurses require approval;
  var approved = null;
  if (request.userType === 'patient') {
    approved = 1;
  }

  let regNumber = null;
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

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(400).send(err.sqlMessage);
    } else if (rows.length === 0) {
      res.status("500");
      res.send("Server Error during Registration.");
    } else {
      console.log(request.userType);
      res.status(201).json(request.userType);
    }    
  });
});

app.post("/api/users/approve", function (req, res) {
  const body = req.body.user;
  console.log('Received approval request ...', req.body);
  const updateSql = `UPDATE user SET approved=1 WHERE email= '${body.email}'`;

  db.query(updateSql, (err, rows) => {
    if (err) {
      console.log(err);
      res.status("500").send("Error while updating approval status.");
    } else {
      console.log('Update successful');
    }
  })
});

app.get("/api/users/current", function (req, res) {
  const currentId = req.session.userid;
  if (!currentId) {
    res.status("404").send("No current user.");
  } else {
    const sql = `SELECT * FROM user WHERE id = ${currentId};`;
    db.query(sql, (err, rows) => {
      if (err) throw err;
      if (rows.length === 0) {
        res.status("404").send("Couldn't find user.");
      } else {
        const currentUser = rows[0];
        res.json(currentUser);
      }    
  });}
});


app.post("/api/users/reject", function (req, res) {
  const body = req.body.user;
  console.log('Received Rejection request ...', req.body);
  const updateSql = `UPDATE user SET approved=0 WHERE email= '${body.email}'`;

  db.query(updateSql, (err, rows) => {
    if (err) {
      console.log(err);
      res.status("500").send("Error while updating approval rejection status.");
    } else {
      console.log('Update successful');
    }
  })
});

app.get("/api/users/unapproved", function (req, res) {
  const sql = `SELECT * FROM user WHERE approved is NULL;`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    if (rows.length === 0) {
      res.status("404").send("Error while getting unApproved Users.");
    } else {
      res.json(rows);
    }    
});
});

app.post("/api/patients/reject", function (req, res) {
  const body = req.body.selfAssessmentForTable;
  console.log('Received assement rejection request ...', req.body);
  const updateSql = `UPDATE assessment SET rejected=1 WHERE fkPatientId= '${body.userId}'`;

  db.query(updateSql, (err, rows) => {
    if (err) {
      console.log(err);
      res.status("500").send("Error while updating assessment status.");
    } else {
      console.log('Update successful');
    }
  })
});

app.post("/api/self-assessment-test", function (req, res) {
  const currentId = req.session.userid;
  if (!currentId) {
    res.status("400").send("No current user. Bad Request");
  } else {
    const body = req.body;
    console.log('/api/self-assessment-test body', body);

    // Set existing self-assessment for user to viewedByNurse ... we might want to have active flag instead.
    const updateSql = `UPDATE assessment SET viewedByNurse=1, assignedDoctorId=null WHERE fkPatientId=${currentId}`;
    db.query(updateSql, (err, rows) => {
      if (err) {
        console.log(err);
        res.status("500").send("Error while inserting self-assessment test.");
      } else {
        console.log('Update succesful');
      }
    })

    // Delete any existing appointments.
    const deleteExistingAppointments = `DELETE FROM appointment WHERE fkPatientId = ${currentId}`;
    db.query(deleteExistingAppointments, (err, rows) => {
      if (err) {
        console.log(err);
        res.status("500").send("Error while deleting existing appointments.");
      } else {
        console.log('Update succesful');
      }
    })

    const insertSql = `INSERT INTO assessment (date, viewedByNurse, fkPatientId, q_difficultyBreathing, q_ageRange, q_firstSymptoms, q_situation, q_secondSymptoms, q_hasBeenCloseContact,
    q_hasBeenTested, q_hasTraveled) VALUES ('${getTodayDate()}', 0, ${currentId}, ${body.q_difficultyBreathing}, 
    '${body.q_ageRange}',${body.q_firstSymptoms},${body.q_situation},${body.q_secondSymptoms}, ${body.q_hasBeenCloseContact}, ${body.q_hasBeenTested}, ${body.q_hasTraveled})`
    db.query(insertSql, (err, rows) => {
      if (err) {
        console.log(err);
        res.status("500").send("Error while inserting self-assessment test.");
      }
      if (rows.length === 0) {
        res.status("500").send("Error while inserting self-assessment test.");
      } else {
        const assessment = rows[0];
        console.log("Self-Assessment Test", assessment);
        res.status(201).json(assessment);
      }    
  });}
});

app.get('/api/self-assessment-test/unviewed', function (req, res) {
  console.log("Request Tests for Nurses")
  const sql = `SELECT a.fkPatientId AS userId, user.fullName, a.id AS testId, a.date, a.q_difficultyBreathing, a.q_ageRange, a.q_firstSymptoms, a.q_situation, a.q_secondSymptoms, 
  a.q_hasBeenCloseContact, a.q_hasBeenTested, a.q_hasTraveled
  FROM assessment a
  JOIN user ON user.id = a.fkPatientId
  WHERE viewedByNurse = 0 AND user.fkUserType = 1 AND user.active = 1 AND rejected = 0
  ORDER BY a.date ASC;`

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      res.status("500").send("Error while getting unviewed self-assessment tests.");
    } else {
      console.log(rows);
      res.status(200).json(rows);
    }
  })
});

app.get('/api/self-assessment-test/doctor/:doctorId',  function (req, res) {
  const sql = `SELECT a.fkPatientId AS userId, user.fullName, a.id AS testId, a.date, a.q_difficultyBreathing, a.q_ageRange, a.q_firstSymptoms, a.q_situation, a.q_secondSymptoms, 
  a.q_hasBeenCloseContact, a.q_hasBeenTested, a.q_hasTraveled
  FROM assessment a
  JOIN user ON user.id = a.fkPatientId
  WHERE assignedDoctorId = ${req.params.doctorId} AND user.fkUserType = 1 AND user.active = 1 AND rejected = 0
  ORDER BY a.date ASC;`

  console.log(sql);

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      res.status("500").send("Error while getting unviewed self-assessment tests.");
    } else {
      console.log(rows);
      res.status(200).json(rows);
    }
  })
});

app.get('/api/users/doctors', function (req, res) {
  const sql = `SELECT * FROM user WHERE fkUserType = 2 AND active=1 AND approved=1`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      res.status("500").send("Error while fetching doctors.");
    } else {
      console.log(rows);
      res.status(200).json(rows);
    }
  })
})

app.post('/api/self-assessment-test/assign', function (req, res) {
  console.log(`Received request to assign test ${req.body.assessment.testId} to doctor ${req.body.doctor.id} ...`);
  const sql = `UPDATE assessment SET assignedDoctorId = ${req.body.doctor.id} WHERE id = ${req.body.assessment.testId}`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      res.status("500").send("Error while assigning test to doctor.");
    } else {
      res.status(200).json(rows);
    }
  })
});

app.get('/api/schedule/:userId', function (req, res) {
  const sql = `SELECT a.id as scheduleId, a.location, a.dateTime, a.fkProfessionalId as professioanlId, u.id as patientId, u.fullName as patientFullName FROM appointment a JOIN user u ON u.id = a.fkPatientId WHERE a.fkProfessionalId = ${req.params.userId};`
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      res.status("500").send(`Error while loading schedule for ID ${req.params.userId}.`);
    } else {
      console.log(rows);
      res.status(200).json(rows);
    }
  })
});

app.get('/api/self-assessment-test/status/:patientId', function (req, res) {
  const sql = `SELECT patient.id AS patientId, ass.id AS assessmentId, ass.date AS assessmentDate, ass.viewedByNurse, ass.assignedDoctorId, doctor.fullName AS doctorFullName, app.location, app.dateTime AS appointmentTime, ass.rejected
  FROM assessment ass
  JOIN user patient ON patient.id = ass.fkPatientId
  LEFT JOIN user doctor ON ass.assignedDoctorId = doctor.id
  LEFT JOIN appointment app ON app.fkPatientId = patient.id
  WHERE ass.id = (select max(id) from assessment where fkPatientId = ${req.params.patientId});`

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      res.status("500").send(`Error while loading assessment status for ${req.params.patientId}.`);
    } else {
      console.log(rows);
      res.status(200).json(rows);
    }
  })
})

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

// module.exports = app;


//Edit User Profile 
app.put("/api/users/editprofile", function (req, res) {
  const body = req.body;
  console.log('Received profile edit request ...', body);

  const sql = `UPDATE 
                    user 
                SET
                  fullName = '${body.fullName}',
                  address = '${body.address}',
                  phoneNumber = '${body.phoneNumber}',
                  lastLoginDate = '${getTodayDate()}',
                  dateOfBirth = '${body.dateOfBirth}'
                WHERE
                email = '${body.email}' `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(400).send(err.sqlMessage);
    } else {
      console.log(rows);
      res.status(200).json(rows);
    }   
  });
});
