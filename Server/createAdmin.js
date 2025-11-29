import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const createAdminUser = async () => {
  try {
    // Connect as root
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: "root", // root user
      password: DB_PASS, // root password
      multipleStatements: true,
    });

    // SQL commands to create database, admin user, and grant privileges
    const sql = `
      CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;
      CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY 'open@123';
      GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO 'admin'@'localhost';
      FLUSH PRIVILEGES;
    `;

    await connection.query(sql);
    console.log("✅ Database and admin user created successfully!");
    await connection.end();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin user or database:", err);
    process.exit(1);
  }
};

createAdminUser();
