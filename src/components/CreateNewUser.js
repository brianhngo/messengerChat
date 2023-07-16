import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createNewUser, verifyUser, verifyEmail } from '../store/NewUserSlice';

export default function CreateNewUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [emailStatus, setEmailStatus] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState(false);

  const creationStatus = useSelector((state) => state.newuser.status);
  const emailList = useSelector((state) => state.newuser.emailList);
  const usernameList = useSelector((state) => state.newuser.usernameList);

  const userNameHandler = (event) => {
    setUserName(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const firstNameHandler = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameHandler = (event) => {
    setLastName(event.target.value);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (username.trim() === '' || email.trim() === '') {
      // Empty username or email, show highlight
      setUsernameStatus(username.trim() === '');
      setEmailStatus(email.trim() === '');
      return;
    }

    const lowercaseUsername = username.toLowerCase();
    const lowercaseEmail = email.toLowerCase();

    const isUsernameExists = usernameList.some(
      (user) => user.username.toLowerCase() === lowercaseUsername
    );

    const isEmailExists = emailList.some(
      (user) => user.email.toLowerCase() === lowercaseEmail
    );

    setUsernameStatus(isUsernameExists);
    setEmailStatus(isEmailExists);

    if (!isUsernameExists && !isEmailExists) {
      dispatch(
        createNewUser({
          username: username,
          password: password,
          firstname: firstName,
          lastname: lastName,
          email: email,
        })
      );
      setUsernameStatus(false);
      setEmailStatus(false);
    }
  };

  useEffect(() => {
    dispatch(verifyUser());

    dispatch(verifyEmail());
  }, [email, username]);

  useEffect(() => {
    if (creationStatus === true) {
      navigate('/success');
    }
  }, [creationStatus, navigate]);

  return (
    <section id="createContainer">
      <>
        <h1> Create New User</h1>
        <p> Please Enter Information to continue </p>
        <form onSubmit={submitHandler}>
          <label htmlFor="username">
            <h4> Username :</h4>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={userNameHandler}
            className={usernameStatus ? 'highlight' : ''}></input>

          <label htmlFor="password">
            <h4> Password : </h4>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={passwordHandler}></input>

          <label htmlFor="firstname">
            <h4> First Name : </h4>
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={firstName}
            onChange={firstNameHandler}></input>

          <label htmlFor="lastname">
            <h4> Last Name : </h4>
          </label>
          <input
            type="lastname"
            id="lastname"
            name="lastname"
            value={lastName}
            onChange={lastNameHandler}></input>
          <label htmlFor="email">
            <h4> Email : </h4>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={emailHandler}
            className={emailStatus ? 'highlight' : ''}></input>

          {usernameStatus ? (
            <p className="error-message">
              Username already exists. Please choose a different one.
            </p>
          ) : null}

          {emailStatus ? (
            <p className="error-message">
              email already exists. Please choose a different one.
            </p>
          ) : null}
          <button> Create User! </button>
        </form>
        <Link to="/" className="link">
          {' '}
          Back to Login{' '}
        </Link>
      </>
    </section>
  );
}
