import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PostContainer from '../components/PostContainer/PostContainer';

import Sidebar from '../components/Sidebar/Sidebar';
import Widget from '../components/Widget/Widget';

const HomeScreen = () => {
  return (
    <Row>
      <Col xs={1} sm={2} lg={3}>
        <Sidebar />
      </Col>
      <Col sm={8} lg={6} xs={12}>
        <PostContainer />
      </Col>
      <Col>
        <Widget />
      </Col>
    </Row>
  );
};

export default HomeScreen;
