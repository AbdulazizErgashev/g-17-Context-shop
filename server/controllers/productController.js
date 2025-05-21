import { Product } from "../models/productModel.js";

// GET: Barcha mahsulotlar
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Mahsulotlar olinmadi",
      error: error.message,
    });
  }
};

// GET: ID bo‘yicha mahsulot
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Mahsulotni olishda xatolik",
      error: error.message,
    });
  }
};

// POST: Yangi mahsulot qo‘shish
export const addProduct = async (req, res) => {
  const { name, price, category, image } = req.body;

  if (!name || !price || !category || !image) {
    return res
      .status(400)
      .json({ message: "Barcha asosiy maydonlar to‘ldirilishi kerak." });
  }

  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Mahsulot saqlanmadi", error: error.message });
  }
};

// PUT: Mahsulotni yangilash
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({
      message: "Mahsulotni yangilashda xatolik",
      error: error.message,
    });
  }
};

// DELETE: Mahsulotni o‘chirish
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }
    res.json({ message: "Mahsulot o‘chirildi" });
  } catch (error) {
    res.status(500).json({
      message: "Mahsulotni o‘chirishda xatolik",
      error: error.message,
    });
  }
};

// PATCH: liked qiymatini toggle qilish
export const toggleLikeProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }

    product.liked = !product.liked;
    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: "Liked qiymatini o‘zgartirishda xatolik",
      error: error.message,
    });
  }
};
