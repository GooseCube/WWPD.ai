import React from "react";
import projectorScreen from "../../assets/art/projectorScreen.svg";
import gooseCubeMap from "../../assets/gooseCubeMap.png"

import "./styles/styles.css";

function ImageScreen() {
  return (
    <div className="image-screen">
      <img className="screen" src={projectorScreen} alt="Projector Screen" />
      <img className="overlay" src={gooseCubeMap} alt="Goose Cube Map" />
    </div>
  );
}

export default ImageScreen;
