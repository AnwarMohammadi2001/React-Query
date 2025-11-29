import sequelize from "./config/db.js";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to MySQL successfully!");
  } catch (err) {
    console.error("❌ MySQL connection error:", err);
  }
})();
