const { Post, User, Comment, Like, Otp } = require("./models");

User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

User.hasMany(Like, { foreignKey: "userId" });
Like.belongsTo(User, { foreignKey: "userId" });

Post.hasMany(Like, { foreignKey: "postId" });
Like.belongsTo(Post, { foreignKey: "postId" });

Comment.hasMany(Like, { foreignKey: "commentId" });
Like.belongsTo(Comment, { foreignKey: "commentId" });

User.hasOne(Otp, { foreignKey: "userId" });
Otp.belongsTo(User, { foreignKey: "userId" });