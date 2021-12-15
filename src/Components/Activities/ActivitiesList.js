import React from "react";
import "../CardListStyles.css";
import Card from "react-bootstrap/Card";

const ActivitiesList = ({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "3rem",
      }}
    >
      {data.map((activity) => {
        return (
          <Card
            className='gap-2'
            bg='light'
            key={activity.id.toString()}
            style={{ width: "30rem" }}
          >
            <Card.Header>
              <h5 style={{ color: "Crimson" }}>{activity.name}</h5>
            </Card.Header>
            <Card.Body>
              <Card.Text>{activity.description}</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default ActivitiesList;
