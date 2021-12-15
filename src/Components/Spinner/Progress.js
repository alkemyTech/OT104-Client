import React, {useState, useEffect} from "react";
import { Row, Col, Container } from "react-bootstrap";
import { ProgressBar } from "react-bootstrap";

const Progress = () => {

const [progress, setProgress] = useState(0);

useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

return (
        
        <Container>
            <ProgressBar className="mt-5" now={progress}/>
        </Container>
    )
}

export default Progress;
