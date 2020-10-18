import express from 'express';
import {
    changePassword,
    getChangePassword,
    getEditProfile,
    postChangePassword,
    postEditProfile,
    userDetail,
    users
} from '../controllers/userController';
import {
    onlyPublic,
    onlyPrivate,
    uploadAvatar,
} from '../middelwares';
import routes from '../routes';

const userRouter = express.Router();

// userRouter.get(routes.home, users);
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);
userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;