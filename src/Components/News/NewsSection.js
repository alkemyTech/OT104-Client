import React, { useEffect } from "react";
import "../CardListStyles.css";
import Card from "../Card/Card";
import Spinner from "../Spinner/Spinner";
import { getNews } from "../../features/news/newsReducer";
import { useDispatch, useSelector } from "react-redux";
import { alertServiceError } from "../Alert/AlertService";
import LastEvent from "./LastEvent/LastEvent";

const News = () => {
  const { news, loading, error } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews());
  }, []);

  return (
    <div className="container">
      <h1 className="p-4 text-center">Novedades</h1>
      {loading && (
        <div className="row d-flex justify-content-center">
          <Spinner />
          <h3 className="p-4 text-center">se están cargando...</h3>
        </div>
      )}
      <section className="row d-flex justify-content-center p-3">
        {news ? (
          news.map((element) => {
            const { id, name, content, image } = element;
            return (
              <div className="col-sm-6 col-md-4 p-3" key={id}>
                <Card name={name} description={content} image={image} />
              </div>
            );
          })
        ) : (
          <p>No hay novedades</p>
        )}
        {error && alertServiceError("Error", error)}
      </section>

      <LastEvent />
    </div>
  );
};

export default News;
