import styles from './ReviewStep.module.css';

function ReviewStep({ rating, review, onReviewChange }) {
  const handleReviewChange = (e) => {
    onReviewChange(e.target.value);
  };

  return (
    <div className={styles.reviewStep}>
      <h3>Write your review</h3>
      
      <div className={styles.selectedRating}>
        <p>Your rating:</p>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              className={`${styles.star} ${value <= rating ? styles.filled : ''}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      
      <div className={styles.reviewInput}>
        <label htmlFor="review">Share your experience with this product</label>
        <textarea
          id="review"
          value={review}
          onChange={handleReviewChange}
          placeholder="Write your review here (max 100 characters)"
          maxLength="100"
          rows="4"
        />
        <div className={styles.characterCount}>
          <span className={review.length > 100 ? styles.error : ''}>
            {review.length}
          </span>/100 characters
        </div>
      </div>
    </div>
  );
}

export default ReviewStep; 