import React, { useState, useEffect } from 'react';
import { changeUserPassword } from '../store/ForgetPasswordSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { changeStatus } from '../store/ForgetPasswordSlice';
export default function ChangePassword() {
  const navigate = useNavigate();
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordStatus, setPasswordStatus] = useState(false);
  const status = useSelector((state) => state.forgetpassword.changeStatus);
  const dispatch = useDispatch();

  const password1EventHandler = (event) => {
    setPassword1(event.target.value);
  };

  const password2EventHandler = (event) => {
    setPassword2(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (password1 === password2) {
      setPasswordStatus(false);
      dispatch(
        changeUserPassword({
          password: password1,
        })
      );
    } else {
      setPasswordStatus(true);
    }
  };

  const onClickHandler = () => {
    window.localStorage.removeItem('token2');
    dispatch(changeStatus(null));
  };

  useEffect(() => {
    if (status === true) {
      window.localStorage.removeItem('token2');

      console.log(status);
      navigate('/PWChangeSuccess');
    }
  }, [status, navigate]);

  return (
    <>
      <section id="leftContainer">
        <img src="forgetpassword.jpeg" alt="forgetPassword" />
      </section>
      <section id="changePasswordContainer">
        <>
          <h1> Change Password</h1>
          <p> Please Enter New Password </p>
          <form onSubmit={submitHandler}>
            <label htmlFor="password">
              <h4> Password :</h4>
            </label>
            <input
              type="password"
              name="password1"
              onChange={password1EventHandler}
              className={passwordStatus ? 'highlight' : ''}></input>

            <label htmlFor="password">
              <h4> Repeat Password :</h4>
            </label>
            <input
              type="password"
              name="password2"
              onChange={password2EventHandler}
              className={passwordStatus ? 'highlight' : ''}></input>
            <button> Change Password! </button>

            {passwordStatus ? (
              <p className="error-message">
                Passwords do not match. Please Renter your Password
              </p>
            ) : null}
          </form>
          <Link to="/" className="link">
            <h4 id="linkPageChange" onClick={onClickHandler}>
              {' '}
              Back to Login{' '}
            </h4>
          </Link>
        </>
      </section>
    </>
  );
}
