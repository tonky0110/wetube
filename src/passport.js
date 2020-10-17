import passport from "passport";
import GithubStrategy from 'passport-github';
import {
    githubLoginCallback
} from "./controllers/userController";
import routes from './routes';
import User from "./models/User";

passport.use(User.createStrategy());

// Github Auth Strategy
passport.use(
    new GithubStrategy({
            clientID: process.env.GH_ID,
            clientSecret: process.env.GH_SECRET,
            callbackURL: `http://localhost:4000${routes.githubCallback}`
        },
        githubLoginCallback
    ));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());