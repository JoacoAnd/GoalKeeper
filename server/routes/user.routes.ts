import { Router } from "express";
const router = Router();

// Controllers
import { register, login } from "../controllers/user.controller";

// Validations
import userValidation from "../validations/userValidation";

router.post("/register", userValidation, register);
router.post("/login", login);

export default router;