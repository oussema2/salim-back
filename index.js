const express = require("express");
const cors = require("cors");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const api_key = 'e55ce3c03356ae8fa25465c07dbce7c4826b0077e95d701701e8166dc192b0b8'
// Create an instance of the Express application
const app = express();

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(express.json());
app.use(cors());

// Define a route
app.get("/getTemplates", (req, res) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${api_key}`
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("https://127.0.0.1:3333/api/templates", requestOptions)
    .then((response) => response.text())
    .then((result) => res.json(JSON.parse(result)))
    .catch((error) => console.log("error", error));
});

app.get("/getGroups", (req, res) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${api_key}`
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("https://127.0.0.1:3333/api/groups", requestOptions)
    .then((response) => response.text())
    .then((result) => res.json(JSON.parse(result)))
    .catch((error) => console.log("error", error));
});

app.get("/getPages", (req, res) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${api_key}`
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("https://127.0.0.1:3333/api/pages", requestOptions)
    .then((response) => response.text())
    .then((result) => res.json(JSON.parse(result)))
    .catch((error) => console.log("error", error));
});

app.get("/getSendingProfiles", (req, res) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer d7bc353e9ddc340ca3acbeaf61f89a8344166b25009a065dedf9538459c6656c"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("https://127.0.0.1:3333/api/smtp/", requestOptions)
    .then((response) => response.text())
    .then((result) => res.json(JSON.parse(result)))
    .catch((error) => console.log("error", error));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
