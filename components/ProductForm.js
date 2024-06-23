import { useState, useEffect } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    console.log('====================================');
    console.log(image);
    console.log('====================================');
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('categoryId', categoryId);
    if (image) {
      formData.append('image', image);
    }
    
    try {
      const response = await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
            if (response.status === 201) {
        alert('Product added successfully!');
        // Clear form fields after successful submission
        setName('');
        setDescription('');
        setPrice('');
        setCategoryId('');
        setImage(null);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <h2>Add Product</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="mb-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          placeholder="Product Name"
          required
        />
      </div>
      <div className="mb-3">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          placeholder="Product Description"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="form-control"
          placeholder="Product Price"
          required
        />
      </div>
      <div className="mb-3">
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="form-select"
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="form-control"
          accept="image/*"
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Product</button>
    </form>
  );
};

export default AddProductForm;
