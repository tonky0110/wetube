const express = require("express");
const app = express();

const PORT = 4000;
// app.get('/', function (req, res) {
//     res.send('Hello world.');
// });

function handleListening() {
  console.log(`Listening on: http://localhost:${PORT}`);
}

function handleHome(req, res) {
  console.log("Hi from home.");
  res.send("Ho");
}

function handleProfile(req, res) {
  console.log("Hi from profile.");
  res.send("You are on my profile.");
}

app.get("/", handleHome);
app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
