import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Spinner from "../../../Components/Spinner/Spinner";
import axios from "axios";

//function to format date to time ago string
const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " años atrás";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " meses atrás";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " días atrás";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " horas atrás";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutos atrás";
  }
  return Math.floor(seconds) + " segundos atrás";
};

export default function Comments({ inView }) {
  const [comments, setComments] = useState(undefined);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get("http://ongapi.alkemy.org/api/comments");
        setComments(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (inView && comments === undefined) {
      getComments();
    }
  }, [inView]);

  if (!comments) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Container>
      <h3>Comentarios</h3>
      {comments.map((comment) => (
        <div key={comment.id} className="card shadow m-3 px-4 py-2">
          <p className="mt-2">{comment.text}</p>
          <small className="text-muted">{timeAgo(comment.created_at)}</small>
        </div>
      ))}
    </Container>
  );
}
