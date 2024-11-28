import { Request, Response } from "express";
import multer from "multer";
import path from "path";

// Setting storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/upload/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + path.extname(file.originalname));
  },
});

// Initializing the storage engine
export const upload = multer({ storage });

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const uploadImage = async (req: MulterRequest, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  const imgUrl = `src/upload/${req.file.filename}`;

  res.json({
    success: true,
    message: "Image uploaded successfully",
    data: imgUrl,
  });
};

export const uploadMultipleImages = async (req: Request, res: Response) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No files uploaded",
    });
  }

  console.log(req.files);

  if (Array.isArray(req.files)) {
    const imgUrls = req.files?.map((file: any) => `/uploads/${file.filename}`);

    res.status(200).json({
      success: true,
      message: "Files uploaded successfully",
      imgUrl: imgUrls,
    });
  }
};
