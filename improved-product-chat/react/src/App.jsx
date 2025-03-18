import React, { useState, useEffect } from 'react';
import ChatList from './components/ChatList/ChatList.jsx';
import ChatView from './components/ChatView/ChatView.jsx';
import styles from './App.module.css';

function App() {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://my-json-server.typicode.com/codebuds-fk/chat/chats')
            .then(response => response.json())
            .then(data => {
                setChats(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching chats:', error);
                setLoading(false);
            });
    }, []);

    const handleChatSelect = (chat) => {
        setSelectedChat(chat);
    };

    const handleSendMessage = (message) => {
        if (!selectedChat || !message.trim()) return;

        const newMessage = {
            messageId: `msg${Date.now()}`,
            message,
            timestamp: Date.now(),
            sender: 'USER',
            messageType: 'text'
        };

        const updatedChat = {
            ...selectedChat,
            latestMessageTimestamp: newMessage.timestamp,
            messageList: [...selectedChat.messageList, newMessage]
        };

        setSelectedChat(updatedChat);
        setChats(prevChats =>
            prevChats.map(chat =>
                chat.id === selectedChat.id ? updatedChat : chat
            )
        );
    };

    const addCallbackRequest = () => {
        handleSendMessage('I want to receive a call back from Flipkart.');
    };

    return (
        <div className={styles.container}>
            <div className={styles.chatContainer}>
                <ChatList
                    chats={chats}
                    loading={loading}
                    onChatSelect={handleChatSelect}
                    selectedChatId={selectedChat?.id}
                />
                <ChatView
                    chat={selectedChat}
                    onSendMessage={handleSendMessage}
                    onRequestCall={addCallbackRequest}
                />
            </div>
        </div>
    );
}

export default App;
