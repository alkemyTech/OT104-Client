import React, { Component } from "react";
import ReactPlayer from "react-player";
import { PlayFill, PauseFill } from "react-bootstrap-icons";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import "./LastEvent.scss";

const EVENT_URL = "https://www.youtube.com/watch?v=Zp8aZmqf_rU";
const EVENT_ID = /[^=]*$/g.exec(EVENT_URL);
const PREVIEW = `https://i.ytimg.com/vi/${EVENT_ID}/hqdefault.jpg`;

//function to format seconds to mm:ss
const secToMins = (sec) => {
  const minutes = Math.floor(sec / 60);
  const seconds = (sec % 60).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default class App extends Component {
  state = {
    loaded: false,
    url: EVENT_URL,
    preview: PREVIEW,
    playing: true,
    volume: 0.8,
    muted: false,
    played: 0,
    duration: 0,
  };

  handleReady = () => {
    this.setState({ loaded: true });
  };

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing });
  };

  handleVolumeChange = (e) => {
    this.setState({ volume: parseFloat(e.target.value) });
  };

  handleDuration = (duration) => {
    this.setState({ duration });
  };

  handleSeekMouseDown = (e) => {
    this.setState({ seeking: true });
  };

  handleSeekChange = (e) => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  handleSeekMouseUp = (e) => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };

  handleProgress = (state) => {
    if (!this.state.seeking) {
      this.setState(state);
    }
  };
  handleEnd = () => {
    this.setState({ playing: false });
  };

  ref = (player) => {
    this.player = player;
  };

  render() {
    const { loaded, url, preview, playing, volume, muted, played, duration } =
      this.state;

    return (
      <section className="row d-flex justify-content-center p-3">
        <header className="jumbotron">
          <h2 className="display-3 text-center">Ultimo Evento</h2>
        </header>
        <div style={{ aspectRatio: "1.85", maxWidth: "40rem" }} className="shadow py-3">
          <div id="player">
            <ReactPlayer
              width="100%"
              height="100%"
              ref={this.ref}
              url={url}
              light={preview}
              playing={playing}
              volume={volume}
              muted={muted}
              onReady={this.handleReady}
              onPlay={this.handlePlay}
              onProgress={this.handleProgress}
              onDuration={this.handleDuration}
              onEnded={this.handleEnd}
            />
            <div className={playing ? "hidden" : "paused"}>
              <img src={preview} alt="preview" />
            </div>
            <div className={`hover ${!loaded && "hidden"}`}>
              <div className="controls">

              <OverlayTrigger
                  overlay={<Tooltip> {playing ? "Pausar" : "Reproducir" }</Tooltip>}
                >
                <button
                  className="btn btn-primary"
                  onClick={this.handlePlayPause}
                >
                  {playing ? <PauseFill /> : <PlayFill />}
                </button>
                </OverlayTrigger>

                <OverlayTrigger
                  overlay={<Tooltip> {secToMins(duration * played)}</Tooltip>}
                >
                  <input
                    id="progress"
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={played}
                    onMouseDown={this.handleSeekMouseDown}
                    onChange={this.handleSeekChange}
                    onMouseUp={this.handleSeekMouseUp}
                  />
                </OverlayTrigger>

                <OverlayTrigger
                  overlay={<Tooltip>Volumen {volume.toFixed(1)}</Tooltip>}
                >
                  <input
                    id="volume"
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={volume}
                    onChange={this.handleVolumeChange}
                  />
                </OverlayTrigger>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
