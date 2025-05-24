import Joi from "joi";

export const addExpenseSchema = Joi.object({
  categoryId: Joi.string().guid().required(),
  amount: Joi.number().positive().required(),
  date: Joi.date().iso().required(),
  description: Joi.string().required(),
});

export const updateExpenseSchema = Joi.object({
  expenseId: Joi.string().guid().required(),
  categoryId: Joi.string().guid().required(),
  amount: Joi.number().positive().required(),
  date: Joi.date().iso().required(),
  description: Joi.string().required(),
});
