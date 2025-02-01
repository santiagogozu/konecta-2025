import express from "express";
import {login} from "../controller/authController.js";
import {verifyToken} from "../middleware/authMiddleware.js";
import {authorizeRoles} from "../middleware/roleMiddleware.js";
import {create, list, getById} from "../controller/employeesController.js";
const router = express.Router();

router.post("/", verifyToken, authorizeRoles(["Administrador"]), create);
router.get("/", verifyToken, list);
router.get("/:id", verifyToken, getById);

export default router;
