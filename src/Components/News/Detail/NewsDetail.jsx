import React, { useState, useEffect } from "react";
import axios from "axios";
function NewsDetail(e) {
  //   axios.get("http://ongapi.alkemy.org/api/news").then((data) => {
  //     console.log(data.data.data);
  //   });
  const [news, setNews] = useState([]);
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
      <h1>Title</h1>
      {console.log(news)}
    </div>
  );
}

export default NewsDetail;
