import styles from './RatingStep.module.css';

function RatingStep({ rating, onRatingChange }) {
  const handleRatingClick = (value) => {
    onRatingChange(value);
  };

  return (
    <div className={styles.ratingStep}>
      <h3>Rate this product</h3>
      <p className={styles.ratingInstructions}>
        Please select a rating for your product
      </p>
      
      <div className={styles.ratingStars}>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`${styles.star} ${value <= rating ? styles.filled : ''}`}
            onClick={() => handleRatingClick(value)}
          >
            ★
          </span>
        ))}
      </div>
      
      {rating > 0 && (
        <p className={styles.ratingText}>
          You selected: <strong>{rating} {rating === 1 ? 'star' : 'stars'}</strong>
        </p>
      )}
    </div>
  );
}

export default RatingStep; 