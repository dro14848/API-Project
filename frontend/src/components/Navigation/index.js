import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

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