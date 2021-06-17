import { audioClips } from "./audioClips";
import Pad from "./Pad";
import Recording from "./Recording";
import Button from "./Button";
import { useState } from "react";

function App() {
  const [volume, setVolume] = useState(1);
  const [recording, setRecording] = useState("");
  const [speed, setSpeed] = useState(0.5);
  const [playing, setPlaying] = useState(false);
  const [power, setPower] = useState(true);

  const togglePower = () => {
    setPower(!power);
  };

  const speedInverter = () => {
    return Number(1.2 - speed + 0.1).toFixed(2);
  };

  const playRecording = () => {
    if (!recording) return;
    if (!power) return;
    if (playing) return;

    setPlaying(true);
    const reversedSpeed = speedInverter();

    let index = 0;
    let recordArray = recording.split(" ");
    const interval = setInterval(() => {
      const audioTag = document.getElementById(recordArray[index]);
      audioTag.volume = volume;
      audioTag.currentTime = 0;
      audioTag.play();
      index++;
    }, reversedSpeed * 600);
    setTimeout(() => {
      clearInterval(interval);
      setPlaying(false);
    }, reversedSpeed * 600 * recordArray.length - 1);
  };

  return (
    <div
      id="drum-machine"
      className="bg-info min-vh-100 text-white mw-75 mx-auto p-4"
    >
      <div id="display" className="text-center">
        <div className="container">
          <div className="row">
            <div className="col-6">
              {audioClips.map((clip) => {
                return (
                  <Pad
                    key={clip.id}
                    clip={clip}
                    volume={volume}
                    setRecording={setRecording}
                    power={power}
                  />
                );
              })}
            </div>
            <Recording recording={recording} />
          </div>
        </div>
        <h4 className="mt-4">Volume</h4>
        <input
          type="range"
          step="0.01"
          onChange={(e) => {
            setVolume(e.target.value);
          }}
          value={volume}
          max="1"
          min="0"
          className="w-50"
        />
        <Speed></Speed>
        {/* <h4 className="mt-4">Speed</h4>
        <input
          type="range"
          step="0.1"
          onChange={(e) => {
            setSpeed(e.target.value);
          }}
          value={speed}
          max="1.2"
          min="0.1"
          className="w-50 mt-4"
        /> */}
        <div className="d-flex justify-content-center">
          <Button
            onClick={() => playRecording()}
            className="btn btn-success mr-4 mt-3"
          >
            Play
          </Button>
          <Button
            onClick={() => setRecording("")}
            className="btn btn-danger mr-4 mt-3"
          >
            Clear
          </Button>
          <Button
            className="btn bg-dark mr-4 mt-3 text-white"
            value={power}
            onClick={togglePower}
          >
            {power ? "Turn Power Off" : "Turn Power On"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
