import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { verifyInfoForgetPassword } from '../store/ForgetPasswordSlice';
import { changeStatus, changeStatus2 } from '../store/ForgetPasswordSlice';

export default function ForgetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const verifyStatus = useSelector((state) => state.forgetpassword.verifyState);

  const userNameHandler = (event) => {
    setUserName(event.target.value);
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
    try {
      event.preventDefault();
      dispatch(
        verifyInfoForgetPassword({
          username: username,
          firstname: firstName.toLowerCase(),
          lastname: lastName.toLowerCase(),
          email: email,
        })
      );
      if (verifyStatus === true) {
        dispatch(changeStatus(null));
      } else {
        dispatch(changeStatus(false));
      }
    } catch (error) {
      dispatch(changeStatus(false));
    }
  };

  const onClickHandler = () => {
    dispatch(changeStatus2(null));
  };

  useEffect(() => {
    if (verifyStatus === true) {
      navigate('/forget-Password-Success');
      dispatch(changeStatus2(null));
    } else if (verifyStatus === false) {
      dispatch(changeStatus(null));
    }
  }, [verifyStatus, navigate, dispatch]);

  return (
    <>
      <section id="leftContainer">
        <img src="forgetpassword.jpeg" alt="Join Us" />
      </section>
      <section id="forgetContainer">
        <h1> Forget Password?? </h1>
        <p> Please Enter Information to reset password</p>
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
            className={verifyStatus === false ? 'highlight' : ''}></input>

          <label htmlFor="firstname">
            <h4> First Name : </h4>
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={firstName}
            onChange={firstNameHandler}
            className={verifyStatus === false ? 'highlight' : ''}></input>

          <label htmlFor="lastname">
            <h4> Last Name : </h4>
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={lastName}
            onChange={lastNameHandler}
            className={verifyStatus === false ? 'highlight' : ''}></input>

          <label htmlFor="email">
            <h4> Email : </h4>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={emailHandler}
            className={verifyStatus === false ? 'highlight' : ''}></input>
          <button> Submit </button>
        </form>
        {verifyStatus === false ? (
          <p className="error-message">Incorrect Login</p>
        ) : null}
        <Link to="/" className="link">
          <h4 id="linkPageChange" onClick={onClickHandler}>
            Back to Login
          </h4>
        </Link>
      </section>
    </>
  );
}
