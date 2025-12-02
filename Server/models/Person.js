import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Person = sequelize.define("Person", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false },
  education: { type: DataTypes.STRING, allowNull: true },
  birthDate: { type: DataTypes.DATEONLY, allowNull: true },
  country: { type: DataTypes.STRING, allowNull: true },
  gender: { type: DataTypes.STRING, allowNull: true },
  qrCode: { type: DataTypes.TEXT, allowNull: true },
});

export default Person; // ✅ default export
