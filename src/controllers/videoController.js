import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({});

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

export const search = (req, res) => {
    const {
        query: {
            term: searchingBy = ""
        } = {}
    } = req;
    console.log("searchingBy: ", searchingBy);
    return res.render("search", {
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
        body: {
            title = "",
            description = ""
        } = {},
        file: {
            path = ""
        } = {},
    } = req;
    // console.log(title, description, file);
    // To Do: upload and save video
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description,
    });
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
        const video = await Video.findById(id);

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
        res.render("editVideo", {
            pageTitle: `Edit ${video.title}`,
            video
        });
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
    try {
        const {
            params: {
                id: _id
            } = {}
        } = req;
        await Video.findOneAndRemove({
            _id
        });
    } catch (error) {
        console.error(error);
    }
    res.redirect(routes.home);
}