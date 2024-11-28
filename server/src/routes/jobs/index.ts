import { Router } from "express";
import {
  addJob,
  deleteJob,
  editJob,
  getAllJobs,
  getJobById,
} from "../../controller/jobs";
import { verifyToken } from "../../middleware/verifyToken";

const router: Router = Router();

router.get("/", getAllJobs as any);
router.get("/:jobId", getJobById as any);
router.post("/add", verifyToken as any, addJob as any);
router.patch("/:jobId", verifyToken as any, editJob as any);
router.delete("/:jobId", verifyToken as any, deleteJob as any);

export default router;

// middleware -> req va res orasida qandaydir amalallarni bajarmoqchi bo'lsak kerak bo'ladi.
