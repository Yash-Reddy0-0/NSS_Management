// File: routes/programs.js


import express from "express";
import multer from "multer";
import Program from "../models/Program.js";
import path from "path";
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


router.post("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const program = await Program.findByIdAndDelete(id);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.status(200).json({ message: "Program deleted successfully" });
  } catch (error) {
    console.error("Error deleting program:", error);
    res.status(500).json({ message: "Server error", error });
  }

});


// PATCH or POST route to edit a program
// router.post("/edit/:id", upload.array("images", 5), async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { programName, programDate, programDescription, status, category } = req.body;

//     const updatedFields = {
//       programName,
//       programDate,
//       programDescription,
//       status,
//       category
//     };

//     // If new images were uploaded
//     if (req.files && req.files.length > 0) {
//       updatedFields.images = req.files.map((file) => file.path);
//     }

//     const updatedProgram = await Program.findByIdAndUpdate(id, updatedFields, {
//       new: true,
//     });

//     if (!updatedProgram) {
//       return res.status(404).json({ message: "Program not found" });
//     }

//     res.status(200).json({ message: "Program updated successfully", updatedProgram });
//   } catch (error) {
//     console.error("Edit program error:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// });


import fs from "fs";

router.post("/edit/:id", upload.array("images", 5), async (req, res) => {
  try {
    const { id } = req.params;
    const { programName, programDate, programDescription, status, category } = req.body;

    let imagesToDelete = req.body.imagesToDelete || [];
    if (typeof imagesToDelete === "string") {
      imagesToDelete = [imagesToDelete];
    }

    const program = await Program.findById(id);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    // Delete selected images from filesystem
    imagesToDelete.forEach((imgPath) => {
      const fullPath=path.join(process.cwd(), "imgPath");
      fs.unlink(imgPath, (err) => {
        if (err) {
          console.error(`Failed to delete image: ${imgPath}`, err);
        } else {
          console.log(`Deleted image: ${fullPath}`);
        }
      });
    });

    // Filter out deleted images
    program.images = program.images.filter((img) => !imagesToDelete.includes(img));

    // Add new images if uploaded
    if (req.files && req.files.length > 0) {
      const newImagePaths = req.files.map((file) => file.path);
      program.images.push(...newImagePaths);
    }

    // Update other fields
    program.programName = programName;
    program.programDate = programDate;
    program.programDescription = programDescription;
    program.status = status;
    program.category = category;

    await program.save();

    res.status(200).json({ message: "Program updated successfully", updatedProgram: program });

  } catch (error) {
    console.error("Edit program error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});



export default router;
