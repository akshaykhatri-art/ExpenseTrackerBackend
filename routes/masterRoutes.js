import express from "express";
import masterController from "../controllers/masterController.js";
import authenticate from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authenticate);

router.get("/dropdown", masterController.getDropdown);
router.get("/statistics", masterController.getStatistics);

export default router;
