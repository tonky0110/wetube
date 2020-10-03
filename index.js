import express from "express";
const app = express();

const PORT = 4000;
// app.get('/', function (req, res) {
//     res.send('Hello world.');
// });

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

const between = (req, res, next) => {
  console.log("Between");
  next();
};
const handleHome = (req, res) => res.send("Hi home");

const handleProfile = (req, res) => res.send("You are on my profile.");

// app.get("/", between, handleHome);'
app.use(between);
app.get("/", handleHome);
app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
