import React from 'react';
import styles from './DateSeparator.module.css';

const DateSeparator = ({ date }) => {
  return (
    <div className={styles.dateSeparator}>
      <span className={styles.dateLabel}>{date}</span>
    </div>
  );
};

export default DateSeparator; 