import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ul className="loginbutton">
        <ProfileButton user={sessionUser} />
      </ul>
    );
  } else {
    sessionLinks = (
      <ul>
    <OpenModalButton
    className="ModalButton"
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
    <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />

      </ul>
    );
  }
  return (
    <div className='MainNavDiv'>
      <ul className='Homebutton'>
        <NavLink exact to="/">Home</NavLink>
      </ul>
      <div className='buttonTest'>
      {isLoaded && (
        <ul>
          <ProfileButton user={sessionUser} />
        </ul>
      )}
      </div>
    </div>
  );
}

export default Navigation;