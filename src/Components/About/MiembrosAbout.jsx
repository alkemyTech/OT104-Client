import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const MiembrosAbout = ({ membersData }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "3rem",
      }}
    >
      {membersData.length > 0 ? (
        membersData.map((activity) => {
          return (
            <Card
              className="gap-2"
              bg="light"
              key={activity.id.toString()}
              style={{ width: "18rem" }}
            >
              <Card.Img variant="top" src={activity.image} />
              <Card.Body>
                <Card.Title>
                  {" "}
                  <h3>{activity.name}</h3>{" "}
                </Card.Title>
                <br />
                <Card.Text>
                  <h5 dangerouslySetInnerHTML={{ __html: activity.description }}></h5>
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
