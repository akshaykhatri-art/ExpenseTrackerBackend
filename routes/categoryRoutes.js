import express from "express";
import categoryController from "../controllers/categoryController.js";
import authenticate from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";
import {
  addCategorySchema,
  updateCategorySchema,
} from "../validations/categoryValidation.js";

const router = express.Router();

router.use(authenticate);

router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);
router.post("/", validate(addCategorySchema), categoryController.add);
router.put("/", validate(updateCategorySchema), categoryController.update);
router.delete("/:id", categoryController.remove);

export default router;
