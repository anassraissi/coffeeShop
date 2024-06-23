// pages/api/products.js

import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';
import ProductCategory from '../../../models/ProductCategory';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js's default body parsing
  },
};

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public', 'uploads'),
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Formidable error:', err);
        return res.status(500).json({ success: false, error: 'Form parsing error' });
      }

      // Extract string values
      const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
      const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
      const price = Array.isArray(fields.price) ? fields.price[0] : fields.price;
      const categoryId = Array.isArray(fields.categoryId) ? fields.categoryId[0] : fields.categoryId;

      let imageUrl = '';
      if (files.image && files.image[0] && files.image[0].newFilename) {
        imageUrl = `/uploads/${files.image[0].newFilename}`;
      }

      try {
        const newProduct = new Product({
          name,
          description,
          price,
          categoryId,
          imageUrl,
        });
        await newProduct.save();
        res.status(201).json(newProduct);
      } catch (error) {
        console.error('Database error:', error);
        res.status(400).json({ success: false, error: 'Database error' });
      }
    });
  } 
  if (req.method === 'GET') {
    const { categoryName } = req.query;
    try {
      let query = {};
      if (categoryName) {
        const category = await ProductCategory.findOne({ name: categoryName });
        if (category) {
          query.categoryId = category._id;
        } else {
          return res.status(404).json({ success: false, error: 'Category not found' });
        }
      }
      const products = await Product.find(query).populate('categoryId');
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch products' });
    }
  }
}
