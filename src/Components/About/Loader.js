import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loader = () => (
  <div className="row d-flex justify-content-center">
    <Spinner animation="grow" />
    Loading...
  </div>
);

export default Loader;
