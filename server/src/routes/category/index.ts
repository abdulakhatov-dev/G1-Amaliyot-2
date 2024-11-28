import { Router } from "express";
import { getAllCategories } from "../../controller/category";

const router = Router();

// GET: get all categories
router.get("/all", getAllCategories);

export default router;
