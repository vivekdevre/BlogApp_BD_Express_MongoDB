//import models
const Post = require("../models/PostModel");


//business logic

exports.createPost = async (req,res) => {
    try {
        const {title, body} = req.body;
        const post = new Post({
            title,body
        });
        const savedPost = await post.save();
        //search post by id and add comment to its comments array
        res.json({
            post:savedPost
        });
    } catch (error) {
        return res.status(400).json({
            error:error.message
        });
    }
};

exports.getAllPosts = async (req,res) => {
    try {
        const posts = await Post.find().populate("likes").populate("comments").exec();
        res.json({
            posts
        });
    } catch (error) {
        return res.status(400).json({
            error:error.message
        });
    }
};