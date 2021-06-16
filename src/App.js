import { audioClips } from "./audioClips";
import Pad from "./Pad";
import { useState } from "react";

function App() {
  const [volume, setVolume] = useState(1);
  const [recording, setRecording] = useState("");
  const [speed, setSpeed] = useState(0.5);

  const playRecording = () => {
    let index = 0;
    let recordArray = recording.split(" ");
    const interval = setInterval(() => {
      const audioTag = document.getElementById(recordArray[index]);
      audioTag.volume = volume;
      audioTag.currentTime = 0;
      audioTag.play();
      index++;
    }, speed * 600);
    setTimeout(() =>
      clearInterval(interval, speed * 600 * recordArray.length - 1)
    );
  };

  return (
    <div id="drum-machine" className="bg-info min-vh-100 text-white">
      <div id="display" className="text-center">
        <h2>Drum Machine</h2>
        {audioClips.map((clip) => {
          return (
            <Pad
              key={clip.id}
              clip={clip}
              volume={volume}
              setRecording={setRecording}
            />
          );
        })}
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
        <h3>{recording}</h3>
        {recording && (
          <>
            <button
              onClick={() => playRecording()}
              className="btn btn-success mr-4 mt-4"
            >
              Play
            </button>
            <button
              onClick={() => setRecording("")}
              className="btn btn-danger mt-4"
            >
              Clear
            </button>
            <br />
            <input
              type="range"
              step="0.01"
              onChange={(e) => {
                setSpeed(e.target.value);
              }}
              value={speed}
              max="1.2"
              min="0.1"
              className="w-50 mt-4"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
