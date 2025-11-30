import User from "../models/User.js";

// گرفتن کاربر بر اساس ID
export const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
};
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// گرفتن کاربر بر اساس ایمیل
export const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// گرفتن همه کاربران
export const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (err) {
    console.error(err);
    return [];
  }
};

// مثال: endpoint برای کاربر خاص
export const getUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// مثال: endpoint برای همه کاربران
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
