import express from "express";
import expenseController from "../controllers/expenseController.js";
import authenticate from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";
import {
  addExpenseSchema,
  updateExpenseSchema,
} from "../validations/expenseValidation.js";

const router = express.Router();

router.use(authenticate);

router.get("/", expenseController.getAll);
router.get("/filter", expenseController.getFiltered);
router.get("/:id", expenseController.getById);
router.post("/", validate(addExpenseSchema), expenseController.add);
router.put("/", validate(updateExpenseSchema), expenseController.update);
router.delete("/:id", expenseController.remove);

export default router;
