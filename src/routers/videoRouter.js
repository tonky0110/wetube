import express from 'express';
import {
    deleteVideo,
    editVideo,
    getUpload,
    home,
    postUpload,
    videoDetail,
    videos
} from '../controllers/videoController';
import routes from '../routes';

const videoRouter = express.Router();

// videoRouter.get(routes.home, videos);
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, postUpload);
videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;