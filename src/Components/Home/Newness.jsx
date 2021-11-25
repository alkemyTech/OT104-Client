import React from "react";
import "./styles/newness.css";
function Newness() {
  return (
    <div className="newness-conatiner">
      <h2> Últimas Novedades</h2>
      <div className="news">
        <div className="new"></div>
        <div className="new"></div>
        <div className="new"></div>
        <div className="new"></div>
      </div>
      <div className="button-container">
        <button>Ver todas</button>
      </div>
    </div>
  );
}

export default Newness;
