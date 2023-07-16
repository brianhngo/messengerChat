import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllMessages,
  fetchUserMessages,
  addNewMessage,
} from '../store/MessageSlice';

export default function Chatbox() {
  const messagesList = useSelector((state) => state.messages.messageList);
  const dispatch = useDispatch();
  const [chatBox, setChatBox] = useState('');
  const userMessageList = useSelector(
    (state) => state.messages.messageListUser
  );

  const chatBoxHandler = (event) => {
    console.log(chatBox);
    setChatBox(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(
      addNewMessage({
        message: chatBox,
        status: 'sent',
      })
    );
  };

  useEffect(() => {
    dispatch(fetchAllMessages());
  }, [messagesList]);

  useEffect(() => {
    dispatch(fetchUserMessages());
  }, []);

  return (
    <div>
      <div className="chat-box">
        <div className="chat-messages">
          <div className="message">
            <div className="sender">John Doe</div>
            <div className="text">Hello, how are you?</div>
          </div>
          <div className="message">
            <div className="sender">Jane Smith</div>
            <div className="text">I'm good, thanks! How about you?</div>
          </div>
        </div>
        <div className="chat-input">
          <input type="text" placeholder="Type your message" />
          <button>Send</button>
        </div>
      </div>
      <div>
        {messagesList.map((element) => {
          return (
            <div className="chat-box" key={element.id}>
              <div className="message" key={element.id}>
                <div className="sender">
                  {element.User.firstname} {element.User.lastname}
                </div>
                <div className="text"> {element.message} </div>
                <div> {element.status} </div>
              </div>
              <div className="chat-input">
                <form onSubmit={onSubmitHandler}>
                  <input
                    type="text"
                    placeholder="Type your message"
                    onChange={chatBoxHandler}
                  />
                  <button>Send</button>
                </form>
              </div>
            </div>
          );
        })}
        {userMessageList.map((element) => {
          return (
            <div key={element.id}>
              <p> {element.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
