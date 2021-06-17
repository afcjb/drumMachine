import React from "react";

export default function recording({ recording }) {
  return (
    <div className="col-6 mt-3">
      <h4>Recording</h4>
      <div
        className="bg-dark mx-auto w-100 overflow-auto"
        style={{ height: 250 }}
      >
        {recording}
      </div>
    </div>
  );
}
