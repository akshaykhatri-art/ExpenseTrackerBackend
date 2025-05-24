import Joi from "joi";

export const addCategorySchema = Joi.object({
  categoryName: Joi.string().max(100).required(),
});

export const updateCategorySchema = Joi.object({
  categoryId: Joi.string().guid().required(),
  categoryName: Joi.string().max(100).required(),
});
