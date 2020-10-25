import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";

// middlewares
import {
  localsMiddleware
} from "./middelwares";

// Routers
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";

// Routes
import routes from "./routes";

//
import "./passport";

const app = express();

const CookieStore = MongoStore(session);

// middlware
app.use(helmet({
  contentSecurityPolicy: false,
}));
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
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({
      mongooseConnection: mongoose.connection, // session의 정보를 mongo DB에서 관리하기 위한 connection
    }),
  })
);
// 사용자 인증 및 세션.
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);
// routes
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);
export default app;