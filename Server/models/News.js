import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js"; // import User here

const News = sequelize.define(
  "News",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
    authorId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "news",
    timestamps: true,
  }
);

// Associations
News.belongsTo(User, { foreignKey: "authorId", as: "author" });

export default News;
