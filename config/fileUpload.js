import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY // Click 'View API Keys' above to copy your API secret
});

// Upload an image

export const uploadResult = async (req, res, next) => {
  try {
    // console.log("Received files:", req.files); // Add this line to debug

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadedFiles = [];

    for (const file of req.files) {
      // ----- For single upload use this separate ----------------
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "Ecommerce-website"
      });
      // ----------------------------------------------------------
      file.path = result.secure_url;
      uploadedFiles.push(result);
    }

    // req.body.cloudinaryUrls = uploadedFiles;
    // console.log(uploadedFiles)
    next();
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return res.status(500).json({ message: "Image upload failed", error });
  }
};

const storage = multer.diskStorage({
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
  params: "Ecommerce-website"
});

const upload = multer({ storage: storage });

export default upload;
