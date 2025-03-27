import express from "express";
import multer from "multer";
import Program from "../models/Program.js";

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// POST route to add a program
router.post("/add", upload.array("images", 5), async (req, res) => {
  try {
    const { programName, programDate, programDescription,status, category } = req.body;
    const images = req.files.map((file) => file.path);

    const newProgram = new Program({
      programName,
      programDate,
      programDescription,
      status,
      category,
      images,
    });

    await newProgram.save();
    res.status(201).json({ message: "Program added successfully", newProgram });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// GET route to fetch all programs
router.get("/", async (req, res) => {
  try {
    const programs = await Program.find().sort({ programDate: -1 }); // Sort by date descending
    res.status(200).json(programs);
  } catch (error) {
    console.error("Error fetching programs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/status/:status", async (req, res) => {
  try {
    const { status } = req.params;
    
    // Validate status parameter
    const validStatuses = ["Govt.", "Done", "upcoming"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        message: "Invalid status value. Must be one of: Govt., Done, upcoming" 
      });
    }

    const programs = await Program.find({ status }).sort({ programDate: -1 }); // Sort by date descending
    res.status(200).json(programs);
  } catch (error) {
    console.error("Error fetching programs by status:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});


router.get("/gallery", async (req, res) => {
  try {
    const programs = await Program.find({}, "images"); // Fetch only images
    const images = programs.flatMap((program) => program.images); // Flatten the array

    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


export default router;
