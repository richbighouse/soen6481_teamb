const express = require('express')
const path = require('path');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var distDir = path.join(__dirname, "../client/dist/");
console.log("Using distDir -> ", distDir);

app.use(express.static(distDir));

app.listen(port, () => {
  console.log(`Covid19 Data Collection server listening at http://localhost:${port}`)
})

app.get("/api/status", function (req, res) {
  res.status(200).json({ status: "UP" });
});

app.post("/api/login", function (req, res) {
  console.log('Received login request ...');

  const body = req.body;
  console.log('username: ', body.username);
  console.log('password: ', body.password);

  res.status(200).json({ status: "UP" });
});

//module.exports = app;

