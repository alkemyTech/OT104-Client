import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import "./LastEvent.scss";

export default function LastEvent() {
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <header>
        <h2 className="p-4 text-center">Ultimo Evento</h2>
      </header>
      <div style={{ aspectRatio: "1.85", maxWidth: "40rem" }}>
        <ReactPlayer
          id="player"
          url="https://www.youtube.com/watch?v=Zp8aZmqf_rU"
          width="100%"
          height="100%"
          onStart={() => setPlaying(true)}
        />
      </div>
    </>
  );
}
