import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        const videos = await Video
            .find({})
            .sort({
                _id: -1
            });

        res.render("home", {
            pageTitle: "Home",
            videos,
        });
    } catch (error) {
        console.error("error:", error);
        res.render("home", {
            pageTitle: "Home",
            videos: [],
        });
    }
};

export const search = async (req, res) => {
    const {
        query: {
            term: searchingBy = ""
        } = {}
    } = req;
    let videos = [];
    try {
        videos = await Video.find({
            title: {
                $regex: searchingBy,
                $options: "i"
            }
        });
    } catch (error) {
        console.error(error);
    }
    res.render("search", {
        pageTitle: "Search",
        searchingBy,
        videos,
    });
};

export const getUpload = (req, res) =>
    res.render("upload", {
        pageTitle: "Upload",
    });

export const postUpload = async (req, res) => {
    const {
        user,
        body: {
            title = "",
            description = ""
        } = {},
        file: {
            path = ""
        } = {},
    } = req;
    console.log('user: ', user);
    // console.log(title, description, file);
    // To Do: upload and save video
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description,
        creator: req.user.id
    });
    user.videos.push(newVideo.id);
    req.user.save();
    console.log("newVideo: ", newVideo);
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
    try {
        const {
            params: {
                id
            } = {}
        } = req;
        const video = await Video.findById(id).populate("creator");
        console.log('video: ', video);
        res.render("videoDetail", {
            pageTitle: video.title,
            video,
        });
    } catch (error) {
        console.error(error);
        res.redirect(routes.home);
    }
};

export const getEditVideo = async (req, res) => {
    try {
        const {
            params: {
                id
            } = {}
        } = req;
        const {
            body: {
                title,
                description
            } = {}
        } = req;
        const video = await Video.findById(id);
        if (video.creator === req.user.id) {
            res.render("editVideo", {
                pageTitle: `Edit ${video.title}`,
                video
            });
        } else {
            throw Error("Don't have enough authentication for edit video.");
        }
    } catch (error) {
        console.error(error);
        res.redirect(routes.home);
    }
}

export const postEditVideo = async (req, res) => {
    try {
        const {
            params: {
                id: _id
            } = {}
        } = req;
        const {
            body: {
                title,
                description
            } = {}
        } = req;
        await Video.findOneAndUpdate({
            _id
        }, {
            title,
            description
        });

        res.redirect(routes.videoDetail(id));

    } catch (error) {
        console.error(error);
        res.redirect(routes.home);
    }
}

export const deleteVideo = async (req, res) => {
    const {
        params: {
            id
        } = {}
    } = req;
    try {
        const video = await Video.findById(id);
        if (video.creator === req.user.id) {
            await Video.findOneAndRemove({
                _id: id
            });
        } else {
            throw Error("Don't have enough authentication for edit video.");
        }
    } catch (error) {
        console.error(error);
    }
    res.redirect(routes.home);
}