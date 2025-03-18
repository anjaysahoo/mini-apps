import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './ChatList.module.css';

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
};

const ChatList = ({ chats, loading, onChatSelect, selectedChatId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [displayedChats, setDisplayedChats] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const CHATS_PER_PAGE = 5;

  // Debounce search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1); // Reset page when search term changes
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  // Filter and paginate chats
  useEffect(() => {
    if (loading) return;

    const filteredChats = chats.filter(chat => {
      const searchLower = debouncedSearchTerm.toLowerCase();
      return (
          chat.title.toLowerCase().includes(searchLower) ||
          (chat.orderId && chat.orderId.toLowerCase().includes(searchLower))
      );
    });

    // Sort chats by latest message timestamp (descending)
    const sortedChats = [...filteredChats].sort((a, b) =>
        b.latestMessageTimestamp - a.latestMessageTimestamp
    );

    const slicedChats = sortedChats.slice(0, page * CHATS_PER_PAGE);

    setDisplayedChats(slicedChats);
    setHasMore(slicedChats.length < sortedChats.length);
  }, [chats, debouncedSearchTerm, page, loading]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Infinite scroll logic
  const lastChatElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
      <div className={styles.chatList}>
        <div className={styles.searchContainer}>
          <h2 className={styles.searchTitle}>Filter by Title / Order ID</h2>
          <input
              type="text"
              placeholder="Start typing to search"
              className={styles.searchInput}
              value={searchTerm}
              onChange={handleSearch}
          />
        </div>
        <div className={styles.chats}>
          {loading ? (
              <div className={styles.loading}>Loading chats...</div>
          ) : displayedChats.length === 0 ? (
              <div className={styles.noChats}>
                {debouncedSearchTerm ? 'No chats match your search' : 'No chats available'}
              </div>
          ) : (
              displayedChats.map((chat, index) => {
                const isLastElement = index === displayedChats.length - 1;

                return (
                    <div
                        key={chat.id}
                        ref={isLastElement ? lastChatElementRef : null}
                        className={`${styles.chatItem} ${selectedChatId === chat.id ? styles.selected : ''}`}
                        onClick={() => onChatSelect(chat)}
                    >
                      <div className={styles.chatImage}>
                        <img src={chat.imageURL} alt={chat.title} />
                      </div>
                      <div className={styles.chatInfo}>
                        <div className={styles.chatTitle}>{chat.title}</div>
                        {chat.orderId && <div className={styles.orderId}>Order {chat.orderId}</div>}
                        {chat.messageList && chat.messageList.length > 0 && (
                            <div className={styles.lastMessage}>
                              {chat.messageList[chat.messageList.length - 1].message.substring(0, 35)}
                              {chat.messageList[chat.messageList.length - 1].message.length > 35 ? '...' : ''}
                            </div>
                        )}
                      </div>
                      <div className={styles.chatDate}>
                        {formatDate(chat.latestMessageTimestamp)}
                      </div>
                    </div>
                );
              })
          )}
          {hasMore && !loading && (
              <div className={styles.loading}>Loading more...</div>
          )}
        </div>
      </div>
  );
};

export default ChatList; 
