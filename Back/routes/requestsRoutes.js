import express from "express";
import {verifyToken} from "../middleware/authMiddleware.js";
import {authorizeRoles} from "../middleware/roleMiddleware.js";
import {
  create,
  list,
  getById,
  remove,
} from "../controller/requestsController.js";
const router = express.Router();

router.post("/", verifyToken, create);
router.get("/", verifyToken, list);
router.get("/:id", verifyToken, getById);
router.delete("/:id", verifyToken, authorizeRoles(["Administrador"]), remove);

export default router;
