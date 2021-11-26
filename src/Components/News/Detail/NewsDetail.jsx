import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/cardnew.css";
function NewsDetail() {
  const [news, setNews] = useState([]);

  // It remains to receive the title by props and import the titles component

  useEffect(() => {
    const getNewsData = async () => {
      await axios
        .get("http://ongapi.alkemy.org/api/news")
        .then((newData) => {
          setNews((news) => newData.data.data);
        })
        .catch((err) => {
          alert("Error", err);
        });
    };
    getNewsData();
  }, []);

  return (
    <div className="news-conatiner">
      {console.log(news)}
      <h1>Title</h1>
      {news.length === 0 ? (
        <h3>Loading...</h3>
      ) : (
        news.map((data) => {
          return (
            <div className="new-card">
              <h3>{data.name}</h3>
              <img src={data.image} alt="" />
              <br />
              {data.content}
            </div>
          );
        })
      )}
    </div>
  );
}

export default NewsDetail;
