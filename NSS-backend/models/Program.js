import mongoose from "mongoose";
import { type } from "os";

const programSchema = new mongoose.Schema({
  programName: { type: String, required: true },
  programDate: { type: Date, required: true },
  programDescription: { type: String, required: true },
  category: { type: String, required: true },
  status:{type:String,required:true},
  images: [{ type: String }], // Array of image paths
});





export default mongoose.model("Program", programSchema);
