import React, { Fragment } from 'react';
import './Header.css';
import logo from '../../assets/Logo.png';

const Header = () => {
  const signedInAsAdmin = false;
  const isUserLoggedIn = false;

  const redirect = (route: string) => {
    // this.router.navigateByUrl(route);
    // this.navigate.emit();
  };

  const signout = () => {
    // this.userService.signout()
    //   .subscribe((_) => {
    //     this.isUserLoggedIn = false;
    //     sessionStorage.removeItem('user');
    //     this.router.navigateByUrl('home');
    //   });
  };


  return (
    <Fragment>
      <nav className="navbar fixed-top navbar-dark bg-dark">
        <a onClick={(_) => redirect('home')}>
          <img src={logo} />
        </a>
        <div className="navbar">
          {signedInAsAdmin && <a className="nav-link" onClick={(_) => redirect('admin-panel')}>Admin Panel</a>}
          <a className="nav-link" onClick={(_) => redirect('home')}>Home</a>
          <a className="nav-link" onClick={(_) => redirect('contact-us')}>Contact Us</a>
          {!isUserLoggedIn && <a className="nav-link" onClick={(_) => redirect('signin')}>Sign In</a>}
          {!isUserLoggedIn && <a className="nav-link" onClick={(_) => redirect('signup')}>Sign Up</a>}
          {!isUserLoggedIn && <a className="nav-link" onClick={(_) => redirect('home')}>My Profile</a>}
          { isUserLoggedIn && <a className="nav-link" onClick={(_) => signout}>Sign Out</a>}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
