import styles from './ProductCard.module.css';

const ProductCard = ({ product, onCardClick }) => {
  return (
    <div className={`card ${styles['product-card']}`} onClick={() => onCardClick(product)}>
      <img src={product.imageUrl} className={`card-img-top ${styles['product-card-img']}`} alt={product.name} />
      <div className={`card-body ${styles['product-card-body']}`}>
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
