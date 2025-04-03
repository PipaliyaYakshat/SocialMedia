const PM = require('../model/post')

exports.createData = async (req, res) => {

    try {
        const post = req.body;

        if (!post) {
            return res.status(404).json({ error: 'Data is not found' });
        }


        if (req.files && req.files.length > 0) {
            const fileNames = req.files.map(file => file.filename);
            post.image = fileNames;
        }

        await PM.create(post);
        res.status(201).json({
            status: "success",
            message: "Data created successfully",
            data: post,
        });

    } catch (error) {

        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.allPost = async (req, res) => {
    try {

        const viewalldata = await PM.find().populate('userId')

        res.status(201).json({
            status: "success",
            message: "Data read successfully",
            data: viewalldata
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};


exports.onePost = async (req, res) => {
    try {
        const postdata = await PM.findById(req.params.id).populate('userId')
        if (!postdata) {
            return res.status(404).json({ message: 'post not found' });
        }
        res.status(201).json({
            status: "success",
            message: "Data read successfully",
            data: postdata,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};


exports.updatePost = async (req, res) => {
    try {
        const updatedata = await PM.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedata) {
            return res.status(404).json({ message: 'post not found' });
        }
        res.status(201).json({
            status: "success",
            message: "Data update successfully",
            data: updatedata,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};



exports.deletePost = async (req, res) => {
    try {
        const deletedata = await PM.findByIdAndDelete(req.params.id);
        if (!deletedata) {
            return res.status(404).json({ message: 'post not found' });
        }
        res.status(201).json({
            status: "success",
            message: "Data delete successfully",
            data: deletedata,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};

