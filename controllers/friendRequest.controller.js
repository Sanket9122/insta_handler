const { Op } = require("sequelize");
const  FriendRequest  = require("../models/friend.model");


const sendFriendRequest = async (req, res) => {
    try {
        const { receiverId } = req.body;
        const senderId = req.user.id;
        console.log("Received friend request:", { receiverId, senderId });
        if (senderId === receiverId) {
            return res.status(400).json({ error: "You cannot send a friend request to yourself" });
        }
        const existingRequest = await FriendRequest.findOne({ where: { senderId, receiverId: receiverId } });
        if (existingRequest) {
            return res.status(400).json({ error: "Friend request already sent" });
        }
        await FriendRequest.create({ senderId, receiverId: receiverId });
        res.status(200).json({ message: "Friend request sent successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const acceptFriendRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const friendRequest = await FriendRequest.findByPk(requestId);
        const userId = req.user.id;
        if (friendRequest.receiverId !== userId) {
            return res.status(403).json({ error: "You are not authorized to accept this friend request" });
        }
        if (!friendRequest) {
            return res.status(404).json({ error: "Friend request not found" });
        }
        friendRequest.status = "accepted";
        await friendRequest.save();
        res.status(200).json({ message: "Friend request accepted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllFriendRequests = async (req, res) => {
    try {
        const userId = req.user.id;
        const friendRequests = await FriendRequest.findAll({ where: { receiverId: userId, status: 'pending' } });
        res.status(200).json(friendRequests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}  

const getAllFriend = async (req, res) => {
    try {
        const { userId } = req.params;
        const friends = await FriendRequest.findAll({
            where: {
                [Op.or]: [
                    { senderId: userId, status: 'accepted' },
                    { receiverId: userId, status: 'accepted' }
                ]
            }
        });
        res.status(200).json(friends);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
    getAllFriendRequests,
    getAllFriend
}