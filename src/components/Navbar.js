import React from "react";
import { NavLink } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import "../CSS/Navbar.css";

const Navbar = () => {
  const { auth, setAuth } = useAuth();

  return (
    <nav className="Navbar-navbar navbar sticky-top navbar-expand-lg">
      <div className="Navbar-container container-fluid">
        {/* <NavLink to={auth.user ? "/user" : "/"} className="navbar-brand"> */}
        <NavLink to="/" className="navbar-brand nav-link">
          <img
            src="./images/beer_logo.svg"
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block me-1"
          />
          Brewery Finder
        </NavLink>

        {auth.user ? (
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <NavLink to={`/users/${auth?.user?.id}`} className="nav-link">
                Welcome {auth?.user?.first_name}!
              </NavLink>
            </li>
            <li className="nav-item">
              {auth.user.is_admin ? (
                <NavLink to="/admin" className="nav-link">
                  Admin Dashboard
                </NavLink>
              ) : (
                <NavLink
                  to={`/users/${auth?.user?.id}/breweries`}
                  className="nav-link"
                >
                  Breweries
                </NavLink>
              )}
            </li>
            <li>
              <NavLink
                to="/"
                onClick={() => {
                  setAuth({});
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                }}
                className="nav-link"
              >
                Logout
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                SignUp
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
