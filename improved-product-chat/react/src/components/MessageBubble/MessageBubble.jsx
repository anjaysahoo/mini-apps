import React from 'react';
import styles from './MessageBubble.module.css';

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).toLowerCase();
};

const MessageBubble = ({ message, isLatestMessage, onRequestCall }) => {
  const isBot = message.sender === 'BOT';
  const isOptionedMessage = message.messageType === 'optionedMessage';

  if (isOptionedMessage) {
    return (
        <div className={`${styles.messageBubble} ${isBot ? styles.botMessage : styles.userMessage}`}>
          <div className={styles.messageContent}>
            <div className={styles.messageText}>{message.message}</div>
            <div className={styles.optionButtons}>
              {message.options && message.options.map((option, index) => (
                  <button
                      key={index}
                      className={styles.optionButton}
                      disabled={!isLatestMessage}
                      onClick={() => {
                        if (option.optionText === 'Request a call') {
                          onRequestCall();
                        }
                      }}
                  >
                    {option.optionText}
                    {option.optionSubText && (
                        <span className={styles.optionSubText}>{option.optionSubText}</span>
                    )}
                  </button>
              ))}
            </div>
            <div className={styles.messageTime}>{formatTime(message.timestamp)}</div>
            {!isLatestMessage && isOptionedMessage && (
                <div className={styles.disabledOverlay}></div>
            )}
          </div>
        </div>
    );
  }

  return (
      <div className={`${styles.messageBubble} ${isBot ? styles.botMessage : styles.userMessage}`}>
        <div className={styles.messageContent}>
          <div className={styles.messageText}>{message.message}</div>
          <div className={styles.messageTime}>{formatTime(message.timestamp)}</div>
        </div>
      </div>
  );
};

export default MessageBubble; 
