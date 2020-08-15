import React, { useEffect, useState } from 'react';
import { navigate } from 'hookrouter';
import './Header.css';
import logo from '../../assets/Logo.png';


const Header = ({ signOut, statusCode, loginResponse }) => {
  const [signedInAsAdmin, setSignedInAsAdmin] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    setIsUserLoggedIn(loginResponse !== null);
  }, [statusCode, loginResponse]);

  const redirect = (route) => {
    navigate(route);
  };

  const signout = () => {
    signOut();
    setIsUserLoggedIn(false);
    sessionStorage.removeItem('user');
    navigate('/home');
  };

  return (
    <nav className="navbar fixed-top navbar-dark bg-dark">
      <a onClick={() => redirect('/home')}>
        <img src={logo} />
      </a>
      <div className="navbar">
        {signedInAsAdmin && <a className="nav-link" onClick={() => redirect('/admin-panel')}>Admin Panel</a>}
        <a className="nav-link" onClick={() => redirect('/home')}>Home</a>
        <a className="nav-link" onClick={() => redirect('/contact-us')}>Contact Us</a>
        {!isUserLoggedIn && <a className="nav-link" onClick={() => redirect('/signin')}>Sign In</a>}
        {!isUserLoggedIn && <a className="nav-link" onClick={() => redirect('/signup')}>Sign Up</a>}
        { isUserLoggedIn && <a className="nav-link" onClick={() => redirect('/profile')}>My Profile</a>}
        { isUserLoggedIn && <a className="nav-link" onClick={signout}>Sign Out</a>}
      </div>
    </nav>
  );
};

export default Header;
