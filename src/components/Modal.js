import React from 'react';
import { Link } from 'react-router-dom';
import SignInForm from './SignInForm';

export default function Modal() {
  return (
    <>
      <section id="leftContainer">
        <img src="Welcome.jpeg" alt="Welcome Sign" />
      </section>
      <section id="rightContainer">
        <SignInForm />
        <Link to="/create-user" className="link">
          <h4 id="linkPageChange"> Create New User</h4>
        </Link>
        <Link to="/forget-Password" className="link">
          <h4 id="linkPageChange"> Forget Password?</h4>
        </Link>
      </section>
    </>
  );
}
