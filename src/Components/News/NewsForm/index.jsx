import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Form";
import { useHistory, useParams } from "react-router-dom";
import newsService from "./../../../Services/novedadesService";

const getNewsData = async (id) => {
  if (id === undefined) {
    return {
      name: "",
      image: "",
      content: "",
      category: "",
    };
  }
  const responseNews = await newsService.getDetail(id);
  if (responseNews === undefined) {
    throw new Error("Error al obtener la noticia");
  }
  const data = responseNews.data.data;
  const { name, image, content, category_id } = data;
  return { name, image, content, category: category_id, id };
};

export default function NewsForm() {
  const history = useHistory();
  const [newToEdit, setNewToEdit] = useState(false);
  const { id } = useParams();
  useEffect(async () => {
    try {
      const values = await getNewsData(id);
      setNewToEdit(values);
    } catch (error) {
      alert(error.message);
      history.goBack();
    }
  }, []);

  const onSubmit = async (values) => {
    let isError = false;
    const newValues = {
      name: values.name,
      image: values.image,
      content: values.content,
      category_id: parseInt(values.category),
    };

    const newsSubmission = axios.create({
      baseURL: "http://ongapi.alkemy.org/api",
    });

    if (id) {
      //Editing a news
      //Check if the image has changed
      const { image, ...rest } = newValues;
      let edited = rest;
      if (newValues.image.slice(0, 4) === "data") edited = newValues;
      try {
        await newsSubmission.put(`news/${id}`, edited);
      } catch (error) {
        isError = error;
      }
    } else {
      //Creating a new news
      try {
        await newsSubmission.post("news", newValues);
      } catch (error) {
        isError = error;
      }
    }

    if (!isError) {
      alert("News guardada con éxito");
      history.go(0);
    } else {
      alert("Error al guardar la news: " + isError.toString());
    }
  };

  return <>
  {newToEdit && <Form newToEdit={newToEdit} edit={id} onSubmit={onSubmit}/>}</>;
}
