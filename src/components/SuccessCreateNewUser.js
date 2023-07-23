import React, { useEffect } from 'react';
import { changeStatus } from '../store/NewUserSlice';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function SuccessCreateNewUser() {
  const dispatch = useDispatch();
  const creationStatus = useSelector((state) => state.newuser.status);

  useEffect(() => {
    if (creationStatus === true) {
      dispatch(changeStatus(false));
    }
  }, [creationStatus, dispatch]);

  return (
    <>
      <section id="leftContainer">
        <img src="success.jpeg" alt="Success Image" />
      </section>
      <div id="newUserContainer">
        <h1> User Created!</h1>
        <Link to="/" className="link">
          <h4 id="linkPageChange"> Back to Login </h4>
        </Link>
      </div>
    </>
  );
}
