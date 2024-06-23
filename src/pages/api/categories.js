// pages/api/categories.js
import dbConnect from '../../../lib/dbConnect';
import ProductCategory from '../../../models/ProductCategory';
dbConnect();

// POST /api/categories - Create a new product category
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, description } = req.body;

    try {
      const newCategory = new ProductCategory({ name, description });
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } 
  if (req.method === 'GET') {
    try {
      const categories = await ProductCategory.find({}); // Assuming ProductCategory is your mongoose model
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
