import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout} from '../../redux/actions/userActions';

import Logo from "../../assets/img/bm.png";

export default () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <div className="container">
        <img src={Logo} alt="navbar_logo" className="navbar__logo" />
        <div className="navbar__header">React/Phaser game</div>

        {!isAuth && (
          <div className="navbar__login">
            <NavLink to="/login">Login</NavLink>
          </div>
        )}

        {!isAuth && (
          <div className="navbar__registration">
            <NavLink to="/registration">Registration</NavLink>
          </div>
        )}
        {isAuth && (
          <div className="navbar__login">
            <NavLink to="/"
            onClick={() => dispatch(logout())}
            >Logout</NavLink>
          </div>
        )}
      </div>
    </div>
  );
};
