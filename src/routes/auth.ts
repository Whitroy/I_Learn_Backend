import { Router } from "express";
import { login } from "../controllers/auth.controller";
import validate from "../middlewares/validate.middlware";
const router = Router();

router.post("/login", validate, login);
router.post("/signup", (req, res) => {});

export default router;
