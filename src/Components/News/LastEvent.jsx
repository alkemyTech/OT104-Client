import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import player from "react-player";

import "./LastEvent.scss";

export default function LastEvent() {
  const [playing, setPlaying] = useState(true);
  const lastEventYTUrl = "https://www.youtube.com/watch?v=Zp8aZmqf_rU";

  //get the id of the youtube video from the url to get the preview image
  const lastEventYTUrlRegex = /[^=]*$/g;
  const lastEventYTUrlId = lastEventYTUrlRegex.exec(lastEventYTUrl);
  const preview = `https://i.ytimg.com/vi/${lastEventYTUrlId}/hqdefault.jpg`;

  const handlePlaying = () => {
    setPlaying(!playing);
  };

  return (
    <>
      <header>
        <h2 className="p-4 text-center">Ultimo Evento</h2>
      </header>
      <div style={{ aspectRatio: "1.85", maxWidth: "40rem" }}>
        <div id="player">
          <ReactPlayer
            url={lastEventYTUrl}
            width="100%"
            height="100%"
            playing={playing}
            light
          />
          <div className={playing ? "hidden" : "paused"}>
            <img src={preview} alt="preview" />
          </div>
        </div>
        <button className="btn btn-outline-primary" onClick={handlePlaying}>
          {playing ? "Pausar" : "Reproducir"}
        </button>
      </div>
    </>
  );
}
