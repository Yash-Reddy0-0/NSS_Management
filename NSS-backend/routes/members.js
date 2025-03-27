import express from "express";
import multer from "multer";
import Member from "../models/Member.js";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/add", upload.single("profilePic"), async (req, res) => {
  try {
    console.log("Received Data:", req.body); // ✅ Debugging log
    console.log("Uploaded File:", req.file); // ✅ Debugging log for file

    // Manually extract fields
    const { name, email, unit, position } = req.body;

    if (!name || !email || !unit || !position) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!["head", "volunteer"].includes(position)) {
      return res.status(400).json({ error: "Invalid position value" });
    }

    const profilePicPath = req.file ? `uploads/${req.file.filename}` : "uploads/profile.jpeg";

    const newMember = new Member({
      name,
      email,
      unit,
      position,
      profilePic: profilePicPath,
    });

    await newMember.save();
    res.status(201).json({ message: "Member added successfully!", member: newMember });
  } catch (error) {
    console.error(error); // ✅ Log error for debugging
    res.status(500).json({ error: error.message });
  }
});




router.get("/", async (req, res) => {
    try {
      const members = await Member.find();  // Get all members from DB
      res.json(members);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch members" });
    }
  });
export default router;
