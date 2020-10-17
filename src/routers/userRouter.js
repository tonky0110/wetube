import express from 'express';
import {
    changePassword,
    getEditProfile,
    userDetail,
    users
} from '../controllers/userController';
import {
    onlyPublic,
    onlyPrivate
} from '../middelwares';
import routes from '../routes';

const userRouter = express.Router();

// userRouter.get(routes.home, users);
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;