import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CreateSpot from '../Spot-Create';
import './Navigation.css';
import logo from "./logo.png"

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
        <NavLink exact to="/" > <img className='logoimg' src={logo} />
        </NavLink>
      </ul>
      {/* <CreateSpot/> */}
      <div className='buttonTest'>
      {isLoaded && (
        <ul>
          <ProfileButton user={sessionUser} />
          {/* <CreateSpot className='createSpotButton'/> */}
        </ul>
      )}
      </div>
    </div>
  );
}

export default Navigation;