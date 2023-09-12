const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./Models/UserModel");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const api_key =
  "d7bc353e9ddc340ca3acbeaf61f89a8344166b25009a065dedf9538459c6656c";
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
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(
    "mongodb+srv://freelancer:m5Y0YY2WWXjxM3Mr@cluster0.cspwo.mongodb.net/docorWebsit?retryWrites=true&w=majority",
    connectionParams
  )
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});
// Define a route
app.get("/getTemplates", (req, res) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${api_key}`);

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
  myHeaders.append("Authorization", `Bearer ${api_key}`);

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
  myHeaders.append("Authorization", `Bearer ${api_key}`);

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
  myHeaders.append("Authorization", `Bearer ${api_key}`);

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
app.post("/addCampagne", (req, res) => {
  var myHeaders = new Headers();
  console.log(req.body);
  myHeaders.append(
    "Authorization",
    "Bearer d7bc353e9ddc340ca3acbeaf61f89a8344166b25009a065dedf9538459c6656c"
  );
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(req.body),
    redirect: "follow",
  };

  fetch("https://127.0.0.1:3333/api/campaigns/", requestOptions)
    .then((response) => response.text())
    .then((result) => res.send({ ...JSON.parse(result), code: 200 }))
    .catch((error) => console.log("error", error));
});

app.get("/getCampagne", (req, res) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${api_key}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("https://127.0.0.1:3333/api/campaigns/summary", requestOptions)
    .then((response) => response.text())
    .then((result) => res.json(JSON.parse(result)))
    .catch((error) => console.log("error", error));
});

app.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    console.log(newUser);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get("/login", async (req, res) => {
  const { email, password } = req.query;
  console.log(email, password);
  try {
    const user = await User.findOne({ email, password }).exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // In a real application, you should not send the password in the response.
    // Here, we're sending the entire user object for simplicity.
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
