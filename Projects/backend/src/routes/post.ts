import { Router } from "express";
import { createPost } from "../controllers/posts";
import { validateToken } from "../middlewares/validateToken";

const router = Router();

router.use(validateToken);
router.post("/createpost", createPost);

export default router;
