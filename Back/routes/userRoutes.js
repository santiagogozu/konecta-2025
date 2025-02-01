import express from "express";
import {login} from "../controller/authController.js";
import {verifyToken} from "../middleware/authMiddleware.js";
import {authorizeRoles} from "../middleware/roleMiddleware.js";
import {create} from "../controller/userController.js";
const router = express.Router();

router.post("/login", login);
router.post("/create", verifyToken, create);

export default router;
