import { Request, Response } from "express";
import multer from "multer";
import cloudinary from "../../config/cloudinary";
import fs from "fs/promises";

// Setting storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Process the image here using the uploaded file
    const imgUrl = await cloudinary.uploader.upload(req?.file?.path, {
      folder: "it-jobs",
    });

    // Remove the file from the local filesystem
    await fs.unlink(req?.file?.path);

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imgUrl: imgUrl?.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error uploading image",
    });
  }
};

export const uploadMultipleImages = async (req: Request, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const imgUrls = await Promise.all(
      req.files.map(async (file) => {
        const imgUrl = await cloudinary.uploader.upload(file.path, {
          folder: "it-jobs",
        });

        // Remove the file from the local filesystem
        await fs.unlink(file.path);

        return imgUrl?.secure_url;
      })
    );

    res.status(200).json({
      success: true,
      message: "Multiple images uploaded successfully",
      imgUrls,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error uploading multiple images",
    });
  }
};
