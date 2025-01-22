import pkg from "cloudinary";
const { v2: cloudinary } = pkg;
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

// Multer Configuration: Use memory storage
const storage = multer.memoryStorage();

const upload = multer({ storage });

// Middleware for uploading to Cloudinary
export const uploadResult = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadedFiles = [];

    for (const file of req.files) {
      // Upload the file buffer to Cloudinary
      const result = await cloudinary.uploader
        .upload_stream(
          { folder: "Ecommerce-website" },
          (error, cloudinaryResult) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              return res
                .status(500)
                .json({ message: "Image upload failed", error });
            }
            uploadedFiles.push(cloudinaryResult.secure_url);
            if (uploadedFiles.length === req.files.length) {
              req.body.cloudinaryUrls = uploadedFiles; // Attach URLs to req.body
              next();
            }
          }
        )
        .end(file.buffer);
    }
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ message: "Image upload failed", error });
  }
};

export default upload;
