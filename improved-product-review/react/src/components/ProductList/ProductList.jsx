import { useState, useEffect } from 'react';
import styles from './ProductList.module.css';

function ProductList({ 
  products, 
  loading, 
  error, 
  onRetry, 
  onSelectProduct,
  selectedProductId
}) {
  const [reviewedProducts, setReviewedProducts] = useState({});
  
  // Check localStorage for reviewed products
  useEffect(() => {
    const reviewedMap = {};
    
    products.forEach(product => {
      const savedReview = localStorage.getItem(`product_review_${product.id}`);
      if (savedReview) {
        reviewedMap[product.id] = true;
      }
    });
    
    setReviewedProducts(reviewedMap);
  }, [products]);

  if (loading) {
    return (
      <div className={styles.productList}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.productList}>
        <div className={styles.error}>
          <p>Error: {error}</p>
          <button 
            className={styles.retryButton} 
            onClick={onRetry}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.productList} ${selectedProductId ? styles.productListWithReview : ''}`}>
      <h2>Your Purchase History</h2>
      
      <ul className={styles.list}>
        {products.map(product => (
          <li 
            key={product.id}
            className={`${styles.productItem} ${product.id === selectedProductId ? styles.selected : ''}`}
            onClick={() => onSelectProduct(product)}
          >
            <div className={styles.productImage}>
              <img src={product.imageURL} alt={product.title} />
            </div>
            <div className={styles.productDetails}>
              <h3>{product.title}</h3>
              <p className={styles.orderId}>Order ID: {product.orderId}</p>
              {reviewedProducts[product.id] && (
                <span className={styles.reviewedBadge}>✓ Reviewed</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList; 