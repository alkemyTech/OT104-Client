import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import styles from "./Donation.module.css";

const LINK_PAGO = process.env.REACT_APP_URL_LINK_PAGO

function Donation(props) {
  return (
    <Row className={styles.donationContainer}>
      <Col md={6} className="d-flex justify-content-center flex-column">
        <h2 className="text-center fs-1">{props.text}</h2>
      </Col>
      <Col md={6} className="d-flex justify-content-center">
        <Row className="d-flex flex-column justify-content-center">
          <Button
            as="a"
            href={LINK_PAGO}
          >
            Mercado Pago
          </Button>
        </Row>
      </Col>
    </Row>
  );
}

Donation.propTypes = {
  text(props, propName, componentName) {
    if (props[propName] === undefined) {
      return new Error(
        `You need to pass a prop "${propName}:{'a message as string'}" for ${componentName} Component`
      );
    }
    if (typeof props[propName] !== "string") {
      return new Error(
        `You need to pass a string as a prop for ${componentName} Component`
      );
    }
  },
};
export default Donation;
