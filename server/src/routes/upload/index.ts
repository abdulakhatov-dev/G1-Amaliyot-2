import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken";
import { upload, uploadImage, uploadMultipleImages } from "../../controller/upload";

const router = Router();

router.post(
  "/image",
  verifyToken as any,
  upload.single("image"),
  uploadImage as any
);

router.post('/images', verifyToken as any, upload.array('images', 5), uploadMultipleImages as any)

export default router;
