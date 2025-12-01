import User from "./User.js";
import News from "./News.js";

// Define associations
News.belongsTo(User, { foreignKey: "authorId", as: "author" });
User.hasMany(News, { foreignKey: "authorId", as: "news" });

export { User, News };
