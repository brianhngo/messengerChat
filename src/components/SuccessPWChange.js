import React from 'react';
import { Link } from 'react-router-dom';
export default function SuccessPWChange() {
  return (
    <>
      <section id="leftContainer">
        <img src="success.jpeg" alt="Success Image" />
      </section>
      <div id="newUserContainer">
        <h1> User Created!</h1>
        <Link to="/" className="link">
          <h4 id="linkPageChange"> Please Head to Home Page and Login </h4>
        </Link>
      </div>
    </>
  );
}
