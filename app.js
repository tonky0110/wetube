import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';

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
app.use("/", globalRouter);
app.use('/user', userRouter);
app.use('/video', videoRouter);

export default app;