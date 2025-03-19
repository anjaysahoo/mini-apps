import { useState, useEffect } from 'react';
import ProductList from './components/ProductList/ProductList';
import ProductReview from './components/ProductReview/ProductReview';
import Toast from './components/Toast/Toast';
import styles from './src/App.module.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://my-json-server.typicode.com/codebuds-fk/chat/chats');
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleReviewSubmit = (productId, rating, review) => {
    // Save to localStorage with the specific product ID
    localStorage.setItem(
      `product_review_${productId}`,
      JSON.stringify({ rating, review })
    );
    
    // Close review panel
    setSelectedProduct(null);
    
    // Show toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Flipkart Product Reviews</h1>
      </header>
      
      <main className={styles.main}>
        <ProductList 
          products={products}
          loading={loading}
          error={error}
          onRetry={fetchProducts}
          onSelectProduct={handleProductSelect}
          selectedProductId={selectedProduct?.id}
        />
        
        {selectedProduct && (
          <ProductReview 
            product={selectedProduct} 
            onSubmit={handleReviewSubmit}
          />
        )}
      </main>
      
      {showToast && (
        <Toast message="Review for product submitted successfully" />
      )}
    </div>
  );
}

export default App; 
