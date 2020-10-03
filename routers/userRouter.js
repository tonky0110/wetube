import express from 'express';

const userRouter = express();

userRouter.get('/', (req, res) => {
    res.send('/')
});
userRouter.get('/edit', (req, res) => {
    res.send('/edit')
});
userRouter.get('/changePassword', (req, res) => {
    res.send('/changePassword')
});

export default userRouter;