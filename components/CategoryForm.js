// components/AddCategoryForm.js
import { useState } from 'react';
import axios from 'axios';
const CategoryForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/categories', {
        name,
        description,
      });

      if (response.status === 201) {
        alert('Category added successfully!');
        // Clear form fields after successful submission
        setName('');
        setDescription('');
      }
    } catch (error) {
      setError('Failed to add category');
      console.error('Error adding category:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <h2>Add Product Category</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea id="description" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Add Category</button>
    </form>
  );
};

export default CategoryForm;