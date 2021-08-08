import React from 'react';
import { Button } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <div className="sidebar d-none d-xs-inline-block d-sm-inline-block">
      <i className="fab fa-twitter fa-lg sidebar__twittericon"></i>
      <p>
        <i className="fas fa-home fa-lg"></i>
        <span className="d-none d-lg-inline-block">Home</span>
      </p>
      <p>
        <i className="fas fa-hashtag fa-lg"></i>
        <span className="d-none d-lg-inline-block">Explore</span>
      </p>
      <p>
        <i className="fas fa-bell fa-lg"></i>
        <span className="d-none d-lg-inline-block">Notifications</span>
      </p>
      <p>
        <i className="fas fa-envelope fa-lg"></i>
        <span className="d-none d-lg-inline-block">Messages</span>
      </p>
      <p>
        <i className="fas fa-bookmark fa-lg"></i>
        <span className="d-none d-lg-inline-block">Bookmarks</span>
      </p>
      <p>
        <i className="fas fa-user fa-lg"></i>
        <span className="d-none d-lg-inline-block">Profile</span>
      </p>
      <Button as="div" className="d-none d-lg-block rounded-pill" size="lg">
        Tweet
      </Button>
      <i className=" fas fa-plus-circle fa-lg d-sm-inline d-lg-none"></i>
    </div>
  );
};

export default Sidebar;
