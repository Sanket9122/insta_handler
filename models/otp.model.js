// models/Otp.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");
const User = require("./user.model");

const Otp = sequelize.define(
  "Otp",
  {
    userId: {                           // ✅ FK to users.id
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE'
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: "otps",
    timestamps: true
  }
);

module.exports = Otp;
