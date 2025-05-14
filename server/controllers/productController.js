import { Product } from "../models/productModel.js";

export const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

export const addProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  const saved = await newProduct.save();
  res.status(201).json(saved);
};

