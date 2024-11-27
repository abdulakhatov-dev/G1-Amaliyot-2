import { Router } from "express";
import jobsRoutes from "./jobs";
import usersRoutes from "./users";
import categoryRoutes from "./category";
import authRoutes from "./auth";

const router: Router = Router();

router.use("/auth", authRoutes);
router.use("/jobs", jobsRoutes);
router.use("/users", usersRoutes);
router.use("/category", categoryRoutes);

export default router;
