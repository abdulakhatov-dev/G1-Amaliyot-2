import { Router } from "express";
import { getAllCategories } from "../../controller/category";

const router = Router();

router.get("/all", getAllCategories);

export default router;
