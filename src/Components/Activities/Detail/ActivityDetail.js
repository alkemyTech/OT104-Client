import React, { useState, useEffect } from "react";
import { getActivity } from "../../../Services/activitiesService";

const MockTitleComponent = ({ children }) => {
  return <h1 className="display-5">{children}</h1>;
};

const ActivityDetail = ({ match }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const id = match.params.id;

  useEffect(() => {
    const data = getActivity(id);
    if (data.status === 200) {
      setTitle(data.data.name);
      setContent(data.data.description);
    } else {
      setTitle("No encontrado");
      setContent("La actividad solicitada no existe o no está disponible.");
    }
  }, []);

  return (
    <>
      <MockTitleComponent>{title}</MockTitleComponent>
      <div>{content}</div>
    </>
  );
};

export default ActivityDetail;
