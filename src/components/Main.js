import React from 'react';

import { useSelector } from 'react-redux';
import { Route, Routes, Link } from 'react-router-dom';

import SignedIn from './SignedIn.js';
import CreateNewUser from './CreateNewUser';
import Modal from './Modal.js';
import SuccessCreateNewUser from './SuccessCreateNewUser.js';

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
          </Routes>
        </div>
      )}
    </>
  );
}
