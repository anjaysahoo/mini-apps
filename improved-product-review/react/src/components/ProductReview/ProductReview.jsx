import { useState, useEffect } from 'react';
import RatingStep from '../RatingStep/RatingStep.jsx';
import ReviewStep from '../ReviewStep/ReviewStep.jsx';
import styles from './ProductReview.module.css';

function ProductReview({ product, onSubmit }) {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [error, setError] = useState('');
  
  // Check if review already exists in localStorage
  useEffect(() => {
    const savedReview = localStorage.getItem(`product_review_${product.id}`);
    
    if (savedReview) {
      try {
        const { rating: savedRating, review: savedReviewText } = JSON.parse(savedReview);
        setRating(savedRating);
        setReview(savedReviewText);
      } catch (err) {
        console.error('Error parsing saved review:', err);
      }
    }
  }, [product.id]);

  const handleNext = () => {
    if (step === 1) {
      if (rating === 0) {
        setError('Please select a rating before proceeding');
        return;
      }
      setError('');
      setStep(2);
    }
  };

  const handlePrevious = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = () => {
    if (!review.trim()) {
      setError('Please enter your review');
      return;
    }
    
    if (review.length > 100) {
      setError('Review cannot exceed 100 characters');
      return;
    }
    
    setError('');
    onSubmit(product.id, rating, review);
  };

  return (
    <div className={styles.productReview}>
      <h2>Review Your Product</h2>
      
      <div className={styles.productInfo}>
        <img 
          src={product.imageURL} 
          alt={product.title} 
          className={styles.productImage}
        />
        <div className={styles.productDetails}>
          <h3>{product.title}</h3>
          <p>Order ID: {product.orderId}</p>
        </div>
      </div>
      
      <div className={styles.reviewSteps}>
        <div className={styles.stepIndicator}>
          <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>1</div>
          <div className={styles.connector}></div>
          <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>2</div>
        </div>
        
        <div className={styles.stepContent}>
          {step === 1 && (
            <RatingStep
              rating={rating}
              onRatingChange={setRating}
            />
          )}
          
          {step === 2 && (
            <ReviewStep
              rating={rating}
              review={review}
              onReviewChange={setReview}
            />
          )}
          
          {error && <p className={styles.error}>{error}</p>}
        </div>
        
        <div className={styles.buttons}>
          {step === 2 && (
            <button 
              className={styles.buttonSecondary}
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}
          
          {step === 1 && (
            <button 
              className={styles.buttonPrimary}
              onClick={handleNext}
            >
              Next
            </button>
          )}
          
          {step === 2 && (
            <button 
              className={styles.buttonPrimary}
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductReview; 
