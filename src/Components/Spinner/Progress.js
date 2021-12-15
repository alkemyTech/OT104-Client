import React, {useState, useEffect} from "react";
import { Row, ProgressBar, Container } from "react-bootstrap";

const Progress = ({now}) => {

const percentage = now ? now : 50;

return (

        <Container>
            <Row>
            <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            </Row>
        </Container>
    )
}

export default Progress;
