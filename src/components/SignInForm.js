import React, { useState } from 'react';
import { getLoginInfo } from '../store/LoginPage';
import { useDispatch, useSelector } from 'react-redux';

export default function SignInForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginStatus = useSelector((state) => state.login.isLoggedIn);
  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const loginButtonHandler = (event) => {
    event.preventDefault();
    dispatch(
      getLoginInfo({
        username,
        password,
      })
    );
  };

  return (
    <section id="rightContainer">
      <h1> Login</h1>
      <p> Please login to continue </p>
      <form onSubmit={loginButtonHandler}>
        <label htmlFor="username">
          <h4> Username :</h4>
        </label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={usernameHandler}
          value={username}
          className={loginStatus === false ? 'highlight' : ''}></input>
        <label htmlFor="password">
          <h4> Password : </h4>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={passwordHandler}
          value={password}
          className={loginStatus === false ? 'highlight' : ''}></input>
        {loginStatus === false ? (
          <p className="error-message">Incorrect Login</p>
        ) : null}
        <button> LOGIN </button>
      </form>
    </section>
  );
}
