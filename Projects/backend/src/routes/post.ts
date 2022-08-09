import { Router } from "express";
import { createCollection, createPost } from "../controllers/posts";
import { validateToken } from "../middlewares/validateToken";

const router = Router();

router.use(validateToken);
router.post("/createpost", createPost);
router.post("/createcollection", createCollection);

export default router;
