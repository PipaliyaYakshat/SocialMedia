const CM = require('../model/comment')

exports.createData = async (req, res) => {

    try {
        const comment = req.body;

        if (!comment) {
            return res.status(404).json({ error: 'Data is not found' });
        }


        

        await CM.create(comment);
        res.status(201).json({
            status: "success",
            message: "Data created successfully",
            data: comment,
        });

    } catch (error) {

        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};

exports.allComment = async (req, res) => {
    try {

        const viewalldata = await CM.find().populate([
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


exports.oneComment = async (req, res) => {
    try {
        const commentdata = await CM.findById(req.params.id).populate([
            { path: 'userId' },
            { path: 'postId' }
        ]);
        if (!commentdata) {
            return res.status(404).json({ message: 'post not found' });
        }
        res.status(201).json({
            status: "success",
            message: "Data read successfully",
            data: commentdata,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message,
        });
    }
};


exports.updateComment = async (req, res) => {
    try {
        const updatedata = await CM.findByIdAndUpdate(req.params.id, req.body, { new: true });
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



exports.deleteComment = async (req, res) => {
    try {
        const deletedata = await CM.findByIdAndDelete(req.params.id);
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

