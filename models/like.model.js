const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");


const Like = sequelize.define('Like',{
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    commentId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
},{
    tableName: 'likes'
});

module.exports = Like;