import express from "express";  
import cors from "cors";
import connectDB from "./config/database.js";
import 'dotenv/config';
import authRoutes from "./routes/auth.js";
import membersRoutes from "./routes/members.js";
import path from "path";
import { fileURLToPath } from "url";
import programsRoutes from "./routes/programs.js";
// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Ensure uploads folder is served correctly
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/members", membersRoutes);
app.use("/api/programs", programsRoutes);


// Start Server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
