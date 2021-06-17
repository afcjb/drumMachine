import React from "react";

export default function Speed({ onChange, value, setSpeed }) {
  return (
    <>
      <h4 className="mt-4">Speed</h4>
      <input
        type="range"
        step="0.1"
        onChange={() => onChange()}
        value={value}
        max="1.2"
        min="0.1"
        className="w-50 mt-4"
      />
    </>
  );
}
