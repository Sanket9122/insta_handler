const  Post = require("../models/post.model");


const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.id;
        const post = await Post.create({ title, content, userId });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getPostsOfUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const posts = await Post.findAll({ where: { userId } });
        res.status(200).json({
            posts,
            count: posts.length,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} 

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json({
            posts,
            count: posts.length,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        if (post.userId !== userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }
        await post.destroy();
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} 

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const userId = req.user.id;
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        if (post.userId !== userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }
        post.title = title || post.title;
        post.content = content || post.content;
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createPost,
    getPostsOfUser,
    getAllPosts,
    getPostById,
    deletePost,
    updatePost
}