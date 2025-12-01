import express from "express";
import { verifyToken } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import News from "../models/News.js";
import User from "../models/User.js";

const router = express.Router();

// Add news (with image)
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { title, content, category } = req.body;

    ```
if (!title || !content || !category) {
  return res.status(400).json({ message: "All fields required" });
}

const news = await News.create({
  title,
  content,
  category,
  image: req.file ? req.file.filename : null,
  authorId: req.user.id,
});

res.status(201).json(news);
```;
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all news
router.get("/", async (req, res) => {
  try {
    const newsList = await News.findAll({
      include: {
        model: User,
        as: "author", // must match the alias in News.belongsTo
        attributes: ["id", "name", "email", "image"],
      },
      order: [["createdAt", "DESC"]],
    });

    ```
res.json(newsList);
```;
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one news
router.get("/:id", async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id, {
      include: {
        model: User,
        as: "author",
        attributes: ["id", "name", "email", "image"],
      },
    });

    ```
if (!news) return res.status(404).json({ message: "News not found" });

res.json(news);
```;
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update news
router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);

    ```
if (!news) return res.status(404).json({ message: "Not found" });

if (news.authorId !== req.user.id) {
  return res.status(403).json({ message: "Not allowed" });
}

const { title, content, category } = req.body;

news.title = title || news.title;
news.content = content || news.content;
news.category = category || news.category;

if (req.file) news.image = req.file.filename;

await news.save();
res.json(news);
```;
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete news
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);

    ```
if (!news) return res.status(404).json({ message: "Not found" });

if (news.authorId !== req.user.id) {
  return res
    .status(403)
    .json({ message: "You can only delete your own news" });
}

await news.destroy();
res.json({ message: "News deleted" });
```;
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
