import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Layout = ({ title, children }) => {
  return (
    <div className="wrapper">
      <div className="row">
        <nav className="col-2 col-lg-3">
          <div className="logo">
            <Link className="blue " to="/home">
              <img src="/images/twitter.png" alt="logo" />
            </Link>
          </div>
          <NavLink activeStyle={{ color: '#1fa2f1' }} to="/home">
            <i className="fas fa-home"></i>
          </NavLink>
          <NavLink activeStyle={{ color: '#1fa2f1' }} to="/search">
            <i className="fas fa-search"></i>
          </NavLink>
          <NavLink activeStyle={{ color: '#1fa2f1' }} to="/notifications">
            <i className="fas fa-bell"></i>
          </NavLink>
          <NavLink activeStyle={{ color: '#1fa2f1' }} to="/messages">
            <i className="fas fa-envelope"></i>
          </NavLink>
          <NavLink activeStyle={{ color: '#1fa2f1' }} to="/profile">
            <i className="fas fa-user"></i>
          </NavLink>
          <NavLink activeStyle={{ color: '#1fa2f1' }} to="/signout">
            <i className="fas fa-sign-out-alt"></i>
          </NavLink>
        </nav>
        <div className="mainSectionContainers col-10 col-md-8 col-lg-5">
          <div className="titleContainer">
            <h1>{title}</h1>
          </div>
          {children}
        </div>
        <div className=" d-none d-lg-block col-4 col-lg-4 mt-5">
          {/* Follow suggestions */}
          <aside className="followSuggestion">
            <div className="followSuggestionHeader">
              <h2>Who to follow</h2>
            </div>
            <div className="followUsernameContainer">
              <div className="userImageContainer">
                <img src="/images/defaultProfilePic.jpg" alt="user pic" />
              </div>
              <div className="midFollowContainer">
                <div className="displayName">
                  <span>Tarun Singh</span>
                </div>
                <div className="username">
                  <span>@thesavvycoder</span>
                </div>
              </div>
              <div className="buttonContainer">
                <button id="submitPostButton">Follow</button>
              </div>
            </div>
            <div className="followUsernameContainer">
              <div className="userImageContainer">
                <img src="/images/defaultProfilePic.jpg" alt="user pic" />
              </div>
              <div className="midFollowContainer">
                <div className="displayName">
                  <span>Tarun Singh</span>
                </div>
                <div className="username">
                  <span>@thesavvycoder</span>
                </div>
              </div>
              <div className="buttonContainer">
                <button id="submitPostButton">Follow</button>
              </div>
            </div>
            <div className="followUsernameContainer">
              <div className="userImageContainer">
                <img src="/images/defaultProfilePic.jpg" alt="user pic" />
              </div>
              <div className="midFollowContainer">
                <div className="displayName">
                  <span>Tarun Singh</span>
                </div>
                <div className="username">
                  <span>@thesavvycoder</span>
                </div>
              </div>
              <div className="buttonContainer">
                <button id="submitPostButton">Follow</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Layout;
