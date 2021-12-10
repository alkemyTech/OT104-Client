import React from "react";
import { Row, ProgressBar } from "react-bootstrap";

const Progress = () => {
    return (
        <Row className="d-flex flex-column">
        <ProgressBar now={100}
        />
        </Row>
    )
}

export default Progress;