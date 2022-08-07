import { Router } from "express";
import { googleAuthMid, login, signup } from "../controllers/auth";
import passport from "passport";
import express from "express";
const router = Router();

router.use(passport.initialize());
router.post("/login", login);
router.post("/signup", signup);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthMid
);

router.get("/profile", (req, res) => {
  res.send("Welcome");
});

export default router;
