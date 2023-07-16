import React, { useState } from 'react';
import { getLoginInfo } from '../store/LoginPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
export default function SignInForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
          value={username}></input>
        <label htmlFor="password">
          <h4> Password : </h4>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={passwordHandler}
          value={password}></input>
        <button> LOGIN </button>
      </form>
    </section>
  );
}
