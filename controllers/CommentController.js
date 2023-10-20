//import models
const Post = require("../models/PostModel");
const Comment = require("../models/CommentModel");

//business logic

exports.createComment = async (req,res) => {
    try {
        const {post, user, body} = req.body;
        const comment = new Comment({
            post,user,body
        });
        const savedComment = await comment.save();

        //search post by id and add comment to its comments array

        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments:savedComment._id} }, {new: true})
        .populate("comments")
        .exec();
        res.json({
            post:updatedPost
        });
    } catch (error) {
        return res.status(500).json({
            error:error.message
        });
    }
};