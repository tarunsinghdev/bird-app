import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';

const LandingScreen: React.FC = () => {
  return (
    <Row style={{ height: '100vh' }} className="d-flex flex-xs-row-reverse ">
      <Col
        className="bg-primary d-flex flex-column justify-content-center "
        md={7}
      >
        <Image
          className="d-block mx-auto"
          style={{ width: '35%' }}
          src="/images/twitter.svg"
          alt="twitter"
        />
      </Col>
      <Col md={5} className="d-flex flex-column justify-content-center ">
        <Container>
          <h1>Happenning now</h1>
          <h3>Join Twitter today.</h3>
          <LinkContainer to="/register" style={{ width: '100%' }}>
            <Button
              type="button"
              className="btn-block rounded-pill mt-5 mb-3 p-2"
            >
              Sign Up
            </Button>
          </LinkContainer>

          <LinkContainer to="/login" style={{ width: '100%' }}>
            <Button
              type="button"
              className="btn-block rounded-pill p-2"
              variant="outline-primary"
              block
            >
              Log in
            </Button>
          </LinkContainer>
        </Container>
      </Col>
    </Row>
  );
};

export default LandingScreen;
