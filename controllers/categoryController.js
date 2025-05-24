import categoryModel from "../models/categoryModel.js";

const getAll = async (req, res) => {
  try {
    const categories = await categoryModel.getAll(req.user.userId);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getById = async (req, res) => {
  try {
    const category = await categoryModel.getById(
      req.params.id,
      req.user.userId
    );
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const add = async (req, res) => {
  try {
    const data = {
      ...req.body,
      CurrentUser: req.user.userId,
    };

    const result = await categoryModel.add(data);

    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }

    res.status(200).json({ message: result.message });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const update = async (req, res) => {
  try {
    const data = {
      ...req.body,
      CurrentUser: req.user.userId,
    };

    const result = await categoryModel.update(data);

    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }

    res.status(200).json({ message: result.message });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const remove = async (req, res) => {
  try {
    const result = await categoryModel.remove(req.params.id, req.user.userId);

    if (!result.success) {
      return res.status(403).json({ error: result.message });
    }

    res.status(200).json({ message: result.message });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default { getAll, getById, add, update, remove };
