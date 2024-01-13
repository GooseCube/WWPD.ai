
import React from "react";
import "./styles/styles.css";

function ImageScreen({ screenImage, overlayImage, screenStyles, overlayStyles }) {
  return (
    <div className="image-screen">
      <img className="screen" src={screenImage} alt="Projector Screen" style={screenStyles} />
      <img className="overlay" src={overlayImage} alt="Overlay Image" style={overlayStyles} />
    </div>
  );
}

export default ImageScreen;