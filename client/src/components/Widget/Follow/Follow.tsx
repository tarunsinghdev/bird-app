import React from 'react';
import { Badge, Button, Col, Image, Row } from 'react-bootstrap';

const Follow = () => {
  return (
    <div className=" d-none d-xl-block mt-5">
      <h4>Who to follow</h4>

      <Row>
        <Col lg={3}>
          <Image
            src="/images/user.png"
            alt="pic"
            style={{ width: 50, height: 50 }}
            roundedCircle
            fluid
          />
        </Col>
        <Col md={4} lg={5}>
          <strong>Tarun Singh</strong>
          <p>@thesavvycoder</p> <Badge pill>Follows you</Badge>
        </Col>
        <Col lg={1}>
          <Button className="rounded-pill" id="submitPostButton">
            Follow
          </Button>
        </Col>
      </Row>

      <Row>
        <Col lg={3}>
          <Image
            src="/images/user.png"
            alt="pic"
            style={{ width: 50, height: 50 }}
            roundedCircle
            fluid
          />
        </Col>
        <Col md={4} lg={5}>
          <strong>Tarun Singh</strong>
          <p>@thesavvycoder</p> <Badge pill>Follows you</Badge>
        </Col>
        <Col lg={1}>
          <Button className="rounded-pill" id="submitPostButton">
            Follow
          </Button>
        </Col>
      </Row>

      <Row>
        <Col lg={3}>
          <Image
            src="/images/user.png"
            alt="pic"
            style={{ width: 50, height: 50 }}
            roundedCircle
            fluid
          />
        </Col>
        <Col md={4} lg={5}>
          <strong>Tarun Singh</strong>
          <p>@thesavvycoder</p>{' '}
          <Badge pill color="secondary">
            Follows you
          </Badge>
        </Col>
        <Col lg={1}>
          <Button className="rounded-pill" id="submitPostButton">
            Follow
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Follow;
