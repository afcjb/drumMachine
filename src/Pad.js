import React, { useState, useEffect } from "react";

export default function Pad({ clip, volume, setRecording }) {
  const [active, setActive] = useState(false);

  console.log(volume);

  const playSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    setActive(true);
    setTimeout(() => setActive(false), 300);
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();
    setRecording((prev) => prev + clip.keyTrigger + " ");
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) playSound();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div
      id={clip.id}
      className={`drum-pad btn btn-secondary p-4 m-3 ${
        active && "btn-warning"
      }`}
      onClick={playSound}
    >
      <audio id={clip.keyTrigger} src={clip.url} className="clip" />
      {clip.keyTrigger}
    </div>
  );
}
