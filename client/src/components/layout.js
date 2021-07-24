import React from 'react';
import { Badge, Col, Container, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Layout = ({ title, children }) => {
  return (
    <div className="wrapper">
      <div className="row">
        <nav className="col-2">
          <div className="logo">
            <Link className="blue " to="/home">
              <img src="/images/twitter.png" alt="logo" />
            </Link>
          </div>
          <Link to="/home">
            <i className="fas fa-home"></i>
          </Link>
          <Link to="/search">
            <i className="fas fa-search"></i>
          </Link>
          <Link to="/notifications">
            <i className="fas fa-bell"></i>
          </Link>
          <Link to="/messages">
            <i className="fas fa-envelope"></i>
          </Link>
          <Link to="/profile">
            <i className="fas fa-user"></i>
          </Link>
          <Link to="/signout">
            <i className="fas fa-sign-out-alt"></i>
          </Link>
        </nav>
        <div className="mainSectionContainers col-10 col-md-8 col-lg-6">
          <div className="titleContainer">
            <h1>{title}</h1>
          </div>
          {children}
        </div>
        <div className=" d-none d-lg-block col-4 col-lg-4 mt-5">
          <Container>
            <h4>Who to follow</h4>
          </Container>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col lg={3}>
                  <Image
                    src="/images/defaultProfilePic.jpg"
                    alt="pic"
                    style={{ width: 50, height: 50 }}
                    roundedCircle
                    fluid
                  />
                </Col>
                <Col md={4} lg={5}>
                  <strong>Tarun Singh</strong>
                  <p>@thesavvycoder</p>{' '}
                  <Badge pill bg="secondary">
                    Follows you
                  </Badge>
                </Col>
                <Col lg={1}>
                  <div className="buttonContainer">
                    <button id="submitPostButton">Follow</button>
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col lg={3}>
                  <Image
                    src="/images/defaultProfilePic.jpg"
                    alt="pic"
                    style={{ width: 50, height: 50 }}
                    roundedCircle
                    fluid
                  />
                </Col>
                <Col md={4} lg={5}>
                  <strong>Tarun Singh</strong>
                  <p>@thesavvycoder</p>{' '}
                  <Badge pill bg="secondary">
                    Follows you
                  </Badge>
                </Col>
                <Col lg={1}>
                  <div className="buttonContainer">
                    <button id="submitPostButton">Follow</button>
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col lg={3}>
                  <Image
                    src="/images/defaultProfilePic.jpg"
                    alt="pic"
                    style={{ width: 50, height: 50 }}
                    roundedCircle
                    fluid
                  />
                </Col>
                <Col md={4} lg={5}>
                  <strong>Tarun Singh</strong>
                  <p>@thesavvycoder</p>{' '}
                  <Badge pill bg="secondary">
                    Follows you
                  </Badge>
                </Col>
                <Col lg={1}>
                  <div className="buttonContainer">
                    <button id="submitPostButton">Follow</button>
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default Layout;
