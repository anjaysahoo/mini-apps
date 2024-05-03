import classes from './chat.component.module.css'
import PropTypes from "prop-types";
import {useEffect, useState} from "react";


function ChatComponent({activeProduct}){

    const [localActiveProduct, setLocalActiveProduct] = useState(activeProduct);
    const [userMessage, setUserMessage] = useState("");

    function userMessageHandler(event){
        setUserMessage(event.target.value);
    }

    function messageSendHandler(){
        setUserMessage("");
        const msgObj = {
            "messageId": "msg2",
            "message": userMessage,
            "timestamp": new Date().getTime(),
            "sender": "USER",
            "messageType": "text"
        }

        const updatedMessageList = [...localActiveProduct.messageList, msgObj];
        setLocalActiveProduct((prevActiveProduct) => ({...prevActiveProduct, messageList: updatedMessageList}));
    }

    function getFormatedTime(timeStamp){
        return new Date(timeStamp).toLocaleTimeString().slice(0, 5) + " " + new Date(timeStamp).toLocaleTimeString().slice(-3);
    }

    function sortMessageList(messageList){
        return messageList.sort((a, b) => a.timestamp - b.timestamp);
    }

    useEffect(() => {
        activeProduct.messageList = sortMessageList(activeProduct.messageList)
        setLocalActiveProduct(activeProduct)
    }, [activeProduct]);



    return (
        <>
            <section className={classes["chat"]}>
                <header className={classes["chat__head"]}>
                    <img
                        src={activeProduct.imageURL}
                        alt={activeProduct.title}
                        className={classes["chat__head__image"]}/>
                    <div className={classes["chat__head__title"]}>
                        {activeProduct.title}
                    </div>
                </header>
                <main className={classes["chat__body"]}>
                    <ul className={classes["chat__body__msg-list"]}>
                        {
                            localActiveProduct.messageList.map((messageDetails, index) => (
                                <>
                                    {
                                        (index === 0 ||
                                        (index > 0 && new Date(localActiveProduct.messageList[index - 1].timestamp).toDateString() !==
                                            new Date(localActiveProduct.messageList[index].timestamp).toDateString())) &&
                                        <div className={classes["chat__body__msg-list__date"]}>
                                            {new Date(messageDetails.timestamp).toDateString()}
                                        </div>
                                    }
                                    <li
                                        key={messageDetails.id}
                                        className={`
                                        ${classes["chat__body__msg-list__item-text"]}
                                        
                                        ${messageDetails.sender === 'USER' ? classes["chat__body__msg-list__item-user-text"] : classes["chat__body__msg-list__item-bot-text"]}`}
                                    >
                                        <div className={classes["chat__body__msg-list__item-text__text"]}>
                                            {messageDetails.message}
                                        </div>
                                        <div
                                            className={classes["chat__body__msg-list__item-text__time"]}
                                            style={messageDetails.sender === 'USER' ? {color: "white"} : {color: "#969696"}}
                                        >
                                            {getFormatedTime(messageDetails.timestamp)}
                                        </div>
                                    </li>
                                    {
                                        messageDetails.messageType === "optionedMessage" &&
                                        <li
                                            key={messageDetails.id}
                                            className={classes["chat__body__msg-list__item-bot-option"]}>
                                            <div className={classes["chat__body__msg-list__item-bot-option__head"]}>
                                                Please choose an option from below
                                            </div>
                                            <ul className={classes["chat__body__msg-list__item-bot-option__list"]}>
                                                {
                                                    messageDetails.options.map((option, index) => (
                                                        <li
                                                            key={index}
                                                            className={classes["chat__body__msg-list__item-bot-option__list__item"]}
                                                            style={index < localActiveProduct.messageList.length - 1 ? {cursor: "default"} : {cursor: "pointer"}}
                                                        >
                                                            <div
                                                                className={classes["chat__body__msg-list__item-bot-option__list__item__text"]}>
                                                                {option?.optionText}
                                                            </div>
                                                            <div
                                                                className={classes["chat__body__msg-list__item-bot-option__list__item__sub-text"]}>
                                                                {option?.optionSubText}
                                                            </div>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </li>
                                    }
                                </>
                            ))
                        }

                    </ul>
                </main>
                <footer className={classes["chat__footer"]}>
                    <input
                        onChange={(event) => userMessageHandler(event)}
                        value={userMessage}
                        type="text"
                        placeholder={`Type a message`}
                        className={classes["chat__footer__input"]}
                    />
                    <button
                        onClick={() => messageSendHandler()}
                        disabled={userMessage === ""}
                        className={classes["chat__footer__send-btn"]}>
                        Send
                    </button>
                </footer>
            </section>
        </>
    )
}

ChatComponent.propTypes = {
    activeProduct: PropTypes.object.isRequired
}

export default ChatComponent;
