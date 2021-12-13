import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const MiembrosAbout = ({ memberList }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "3rem",
      }}
    >
      {memberList.length > 0 ? (
        memberList.map((activity) => {
          return (
            <Card
              className="gap-2"
              bg="light"
              key={activity.id.toString()}
              style={{ width: "18rem", height: "25rem" }}
            >
              <Card.Img variant="top" src={activity.image} />
              <Card.Body>
                <Card.Title>
                  {" "}
                  <h3>{activity.name}</h3>{" "}
                </Card.Title>
                <br />
                <Card.Text>
                  <h5>{activity.description}</h5>
                </Card.Text>
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    columnGap: "15%",
                  }}
                >
                  {" "}
                  <Button variant="outline-success" href={activity.linkedinUrl}>
                    Linkdin
                  </Button>
                  <Button variant="outline-success" href={activity.facebookUrl}>
                    Facebook
                  </Button>
                </div>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <p>No Hay Miembros Cargados en la Base de Datos</p>
      )}
    </div>
  );
};

export default MiembrosAbout;
