import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken";
import {
  upload,
  uploadImage,
  uploadMultipleImages,
} from "../../controller/upload";

const router = Router();

// POST: upload single image
router.post(
  "/image",
  verifyToken as any,
  upload.single("image"),
  uploadImage as any
);

// POST: upload multiple images
router.post(
  "/images",
  verifyToken as any,
  upload.array("images", 4),
  uploadMultipleImages as any
);

export default router;
