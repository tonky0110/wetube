import express from "express";
const app = express();

const PORT = 4000;
// app.get('/', function (req, res) {
//     res.send('Hello world.');
// });

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => res.send("Hi home");

const handleProfile = (req, res) => res.send("You are on my profile.");

app.get("/", handleHome);
app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
