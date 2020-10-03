import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

import {
    userRouter
} from './router';

const app = express();

const handleHome = (req, res) => res.send("Hi home");

const handleProfile = (req, res) => res.send("You are on my profile.");

// middlware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(helmet());
app.use(morgan("dev"));

// routes
app.get("/", handleHome);
app.get("/profile", handleProfile);

app.use('/user', userRouter);

export default app;