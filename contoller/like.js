const LM = require('../model/like')

exports.createData = async (req, res) => {

    try {
        const like = req.body;

        if (!like) {
            return res.status(404).json({ error: 'Data is not found' });
        }


        if (!req.body.like) {
            req.body.like = 'unlike';
        }

        await LM.create(like);
        res.status(201).json({
            status: "success",
            message: "Data created successfully",
            data: like,
        });

    } catch (error) {

        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.allLike = async (req, res) => {
    try {

        const viewalldata = await LM.find().populate([
            { path: 'userId' },
            { path: 'postId' }
        ]);

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


exports.oneLike = async (req, res) => {
    try {
        const likedata = await LM.findById(req.params.id).populate([
            { path: 'userId' },
            { path: 'postId' }
        ]);
        if (!likedata) {
            return res.status(404).json({ message: 'post not found' });
        }
        res.status(201).json({
            status: "success",
            message: "Data read successfully",
            data: likedata,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};


exports.updateLike = async (req, res) => {
    try {
        const updatedata = await LM.findByIdAndUpdate(req.params.id, req.body, { new: true });
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



exports.deleteLike = async (req, res) => {
    try {
        const deletedata = await LM.findByIdAndDelete(req.params.id);
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

