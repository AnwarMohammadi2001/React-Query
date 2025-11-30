import User from "../models/User.js";

// GET current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user); // sends user object to frontend
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
