import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatView.module.css';
import MessageBubble from '../MessageBubble/MessageBubble';
import DateSeparator from '../DateSeparator/DateSeparator';

const ChatView = ({ chat, onSendMessage, onRequestCall }) => {
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  if (!chat) {
    return (
        <div className={styles.chatView}>
          <div className={styles.emptyChat}>
            <p>Select a chat to start messaging</p>
          </div>
        </div>
    );
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      onSendMessage(messageInput);
      setMessageInput('');
    }
  };

  // Group messages by date
  const groupMessagesByDate = () => {
    if (!chat.messageList || chat.messageList.length === 0) return [];

    // Sort messages by timestamp
    const sortedMessages = [...chat.messageList].sort((a, b) => a.timestamp - b.timestamp);

    const groups = [];
    let currentDate = null;
    let currentMessages = [];

    sortedMessages.forEach(message => {
      const messageDate = new Date(message.timestamp).toLocaleDateString();

      if (messageDate !== currentDate) {
        if (currentMessages.length > 0) {
          groups.push({
            date: currentDate,
            timestamp: new Date(currentMessages[0].timestamp).getTime(),
            messages: currentMessages
          });
        }
        currentDate = messageDate;
        currentMessages = [message];
      } else {
        currentMessages.push(message);
      }
    });

    if (currentMessages.length > 0) {
      groups.push({
        date: currentDate,
        timestamp: new Date(currentMessages[0].timestamp).getTime(),
        messages: currentMessages
      });
    }

    return groups;
  };

  const messageGroups = groupMessagesByDate();

  const formatDateLabel = (timestamp) => {
    const today = new Date();
    const messageDate = new Date(timestamp);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else if (today.getTime() - messageDate.getTime() < 7 * 24 * 60 * 60 * 1000) {
      // Within the last week
      return messageDate.toLocaleDateString('en-US', { weekday: 'long' });
    } else {
      // Older than a week
      return messageDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '/');
    }
  };

  const isLatestMessage = (messageId) => {
    if (!chat.messageList || chat.messageList.length === 0) return false;

    const sortedMessages = [...chat.messageList].sort((a, b) => a.timestamp - b.timestamp);
    return sortedMessages[sortedMessages.length - 1].messageId === messageId;
  };

  return (
      <div className={styles.chatView}>
        <div className={styles.chatHeader}>
          <div className={styles.chatTitle}>
            <img src={chat.imageURL} alt={chat.title} className={styles.chatTitleImg} />
            <span>{chat.title}</span>
          </div>
        </div>

        <div className={styles.messages}>
          {messageGroups.length === 0 ? (
              <div className={styles.noMessages}>
                <p>Send a message to start chatting</p>
              </div>
          ) : (
              messageGroups.map((group, groupIndex) => (
                  <div key={group.timestamp}>
                    <DateSeparator date={formatDateLabel(group.timestamp)} />
                    {group.messages.map((message) => (
                        <MessageBubble
                            key={message.messageId}
                            message={message}
                            isLatestMessage={isLatestMessage(message.messageId)}
                            onRequestCall={onRequestCall}
                        />
                    ))}
                  </div>
              ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className={styles.inputContainer} onSubmit={handleSendMessage}>
          <input
              type="text"
              placeholder="Type a Message..."
              className={styles.messageInput}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
          />
          <button type="submit" className={styles.sendButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor" />
            </svg>
          </button>
        </form>
      </div>
  );
};

export default ChatView;
