import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ProductCard from '../../components/ProductCard';
import Layout from '../../components/Layout';
import { Modal, Button, Form } from 'react-bootstrap';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for quantity input
  const router = useRouter();
  const { category } = router.query;

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products', {
        params: { categoryName: category },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setQuantity(1); // Reset quantity when modal closes
  };

  const handleOrder = () => {
    // Handle order logic here
    console.log('Order placed for:', selectedProduct, 'Quantity:', quantity);
    handleCloseModal();
  };

  return (
    <Layout>
      <div className="bg-image">
        <div className="welcome-text">
          <div className="container my-5">
            <h2 className="mb-4">{category}</h2>
            <div className="row">
              {products.map((product) => (
                <div key={product._id} className="col-6 col-md-3 col-lg-3 mb-6">
                  <ProductCard product={product} onCardClick={handleCardClick} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal to display selected product details */}
      {selectedProduct && (
        <Modal show={true} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title className="text-primary">Order Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center">
              <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="img-fluid rounded" style={{ maxHeight: '200px' }} />
            </div>
            <h5 className="text-danger">{selectedProduct.name}</h5>
            <p className="text-muted">{selectedProduct.description}</p>
            <p className="text-success">Price: ${selectedProduct.price.toFixed(2)}</p>
            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                min={1}
                max={10}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleOrder}>
              Order
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Layout>
  );
};

export default Products;
