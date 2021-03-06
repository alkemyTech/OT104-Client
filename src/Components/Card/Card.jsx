import { React, useState } from "react";
import { Card as CardComponent, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

const Card = ({
  image,
  title,
  description,
  goDetail,
  id,
  equals,
  buttonOnLine,
}) => {
  const [showDescription, setShowDescription] = useState(false);
  const imageUrl = image ? image : "/images/placeholder/370x220.png";
  const textElipsis = {
    msTextOverflow: "ellipsis",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: "3",
    WebkitBoxOrient: "vertical",
    whiteSpace: "normal",
    fontSize: "0.8em",
  };
  const history = useHistory();

  return (
    <CardComponent
      style={{
        flexBasis: "20rem",
        flexGrow: "1",
        maxWidth: "28rem",
        height: equals ? "30 rem" : "min-content",
        margin: "1vw",
      }}
    >
      <CardComponent.Img
        variant="top"
        src={imageUrl}
        style={{
          height: equals ? "200px" : "auto",
          padding: equals ? "5px" : "auto",
        }}
      />
      <CardComponent.Body>
        <CardComponent.Title>{title}</CardComponent.Title>

        {description?.length > 150 ? (
          <>
            <CardComponent.Text
              style={!showDescription ? textElipsis : { fontSize: "0.8em" }}
              dangerouslySetInnerHTML={{ __html: description }}
              L
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowDescription((isShowing) => !isShowing)}
              aria-expanded={showDescription}
              className="text-center"
            >
              {showDescription ? "Ocultar" : "Ver más"}
            </Button>
          </>
        ) : (
          <CardComponent.Text
            style={{ fontSize: "0.8em" }}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
        {goDetail ? (
          <Button
            className="m-2"
            variant="primary"
            size="sm"
            onClick={() => history.push(`/novedades/${id}`)}
          >
            Detalle
          </Button>
        ) : (
          <></>
        )}
        {buttonOnLine ? (
          <Button
            className="m-1"
            variant="primary"
            size="sm"
            onClick={() => history.push(`/novedades/${id}`)}
          >
            Detalle
          </Button>
        ) : (
          <></>
        )}
      </CardComponent.Body>
    </CardComponent>
  );
};

export default Card;
