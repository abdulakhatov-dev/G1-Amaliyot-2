import { Router } from "express";
import { getAllUsers } from "../../controller/users";
import { verifyToken } from "../../middleware/verifyToken";

const router: Router = Router();

router.get("/", verifyToken as any, getAllUsers as any);

export default router;
