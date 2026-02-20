const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");

const FriendRequest = sequelize.define(
  "FriendRequest",
  {
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted'),
        defaultValue: 'pending'
    }
  },
  {
    tableName: "friend_requests",
  },
);

module.exports = FriendRequest;