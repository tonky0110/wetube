import express from 'express';
import {
    changePassword,
    editProfile,
    userDetail,
    users
} from '../controllers/userController';
import {
    onlyPublic
} from '../middelwares';
import routes from '../routes';

const userRouter = express.Router();

// userRouter.get(routes.home, users);
userRouter.get(routes.editProfile, onlyPublic, editProfile);
userRouter.get(routes.changePassword, onlyPublic, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;