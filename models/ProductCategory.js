// models/ProductCategory.js
import mongoose from 'mongoose';

const ProductCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.ProductCategory || mongoose.model('ProductCategory', ProductCategorySchema);
