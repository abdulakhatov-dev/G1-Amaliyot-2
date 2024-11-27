import { Router } from "express";
import {
  addJob,
  deleteJob,
  editJob,
  getAllJobs,
  getJobById,
} from "../../controller/jobs";

const router: Router = Router();

router.get("/", getAllJobs as any);
router.get("/:jobId", getJobById as any);
router.post("/add", addJob as any);
router.patch("/:jobId", editJob as any);
router.delete("/:jobId", deleteJob as any);

export default router;
