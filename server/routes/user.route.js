import { Router } from "express";
import {registerUser, loginUser, logoutUser} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/log-out', verifyJWT, logoutUser);

export default router;