// models/User.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");

const User = sequelize.define(
  "User",
  {
    id: {                      // ✅ add an auto-increment PK
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,           // ❌ remove primaryKey from email
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100],
      },
    },
    tokenVersion: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = User;