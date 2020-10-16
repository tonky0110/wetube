import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from 'express-session'
import helmet from "helmet";
import morgan from "morgan";
import passport from 'passport';

// middlewares
import {
  localsMiddleware
} from "./middelwares";

// Routers
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

// Routes
import routes from "./routes";

//
import "./passport";

const app = express();

// middlware
app.use(helmet());
app.set("views", "src/views");
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(morgan("dev"));

// session
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: false
}))
// 사용자 인증 및 세션.
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);
// routes
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;