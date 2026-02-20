const { Comment, Like, Post } = require("../models/like.model");


const likeComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id;
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        const existingLike = await Like.findOne({ where: { userId, commentId } });
        if (existingLike) {
            return res.status(400).json({ error: "You have already liked this comment" });
        }
        await Like.create({ userId, commentId });
        res.status(200).json({ message: "Comment liked successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        const existingLike = await Like.findOne({ where: { userId, postId } });
        if (existingLike) {
            return res.status(400).json({ error: "You have already liked this post" });
        }
        await Like.create({ userId, postId });
        res.status(200).json({ message: "Post liked successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteLike = async (req, res) => {
    try {
        const { likeId } = req.params;
        const userId = req.user.id;
        const like = await Like.findByPk(likeId);
        if (!like) {
            return res.status(404).json({ error: "Like not found" });
        }
        if (like.userId !== userId) {
            return res.status(403).json({ error: "You are not authorized to delete this like" });
        }
        await like.destroy();
        res.status(200).json({ message: "Like deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    likeComment,
    likePost,
    deleteLike
}