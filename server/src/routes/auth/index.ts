import { Router } from "express";
import { signIn, signUp } from "../../controller/auth";

const router = Router();

// POST: sign-up
router.post("/sign-up", signUp as any);
// POST: sign-in
router.post("/sign-in", signIn as any);

export default router;
