import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changedLoginStatus } from '../store/LoginPage';
import { useSelector } from 'react-redux';
import { attemptTokenLogin } from '../store/LoginPage';
import Chatbox from './Chatbox.js';

export default function SignedIn() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.login.userInfo);

  const logOutEventHandler = (event) => {
    event.preventDefault();

    dispatch(changedLoginStatus());
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        await dispatch(attemptTokenLogin());
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="signed-in">
      <div className="sidebar">
        <div className="title">SignedIn</div>
        <div className="user-info">
          <div>{userInfo.firstname}</div>
          <div>{userInfo.lastname}</div>
        </div>
        <form onClick={logOutEventHandler}>
          <button>Log Out</button>
        </form>
      </div>
      <div className="chatbox-container">
        <Chatbox />
      </div>
    </div>
  );
}
