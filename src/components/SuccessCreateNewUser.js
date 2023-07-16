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
      <h1> User Created!</h1>
      <Link to="/" className="link">
        {' '}
        Back to Login{' '}
      </Link>
    </>
  );
}
