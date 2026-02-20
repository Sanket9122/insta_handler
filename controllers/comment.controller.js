const  Comment  = require("../models/comment.model");

const createComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { content } = req.body;
        const userId = req.user.id;
        const comment = await Comment.create({ content, userId, postId });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllCommentsOfPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.findAll({ where: { postId } });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id;
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        if (comment.userId !== userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }
        await comment.destroy();
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        const userId = req.user.id;
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        if (comment.userId !== userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }
        comment.content = content;
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createComment,
    getAllCommentsOfPost,
    deleteComment,
    updateComment
}