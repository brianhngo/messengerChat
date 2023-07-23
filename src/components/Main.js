import React from 'react';

import { useSelector } from 'react-redux';
import { Route, Routes, Link } from 'react-router-dom';

import SignedIn from './SignedIn.js';
import CreateNewUser from './CreateNewUser';
import Modal from './Modal.js';
import SuccessCreateNewUser from './SuccessCreateNewUser.js';
import ForgetPassword from './ForgetPassword.js';
import ChangePassword from './ChangePassword.js';
import SuccessPWChange from './SuccessPWChange.js';

export default function Main() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  return (
    <>
      {isLoggedIn ? (
        <SignedIn />
      ) : (
        <div id="container">
          <Routes>
            <Route exact path="/" element={<Modal />} />
            <Route path="/create-user" element={<CreateNewUser />} />
            <Route path="/success" element={<SuccessCreateNewUser />} />
            <Route path="/forget-Password" element={<ForgetPassword />} />
            <Route
              path="/forget-Password-Success"
              element={<ChangePassword />}
            />
            <Route path="PWChangeSuccess" element={<SuccessPWChange />} />
          </Routes>
        </div>
      )}
    </>
  );
}
