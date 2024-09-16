import { Router } from "express";
import USER from "../controllers/UserController.js";
const router = Router();

router.post("/register", USER.register);
router.post("/login", USER.login);
router.post("/logout", USER.logout);

export { router as UsersRouter };
