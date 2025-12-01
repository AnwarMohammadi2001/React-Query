import User from "./User.js";
import News from "./News.js";

// News belongs to User (author)
News.belongsTo(User, { foreignKey: "authorId", as: "author" });

// User has many News
User.hasMany(News, { foreignKey: "authorId", as: "news" });

export { User, News };
