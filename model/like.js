const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    like: {
        type: String,
        enum: ['like', 'unlike'],
        required: true,
        default: 'unlike' 
    }
});

module.exports = mongoose.model('Like', LikeSchema);