import React from "react";
import projectorScreen from "../../assets/art/projectorScreen.svg";
import pirateShip from "../../assets/art/pirateShip.png"

import "./styles/styles.css";

function ImageScreen() {
  return (
    <div className="image-screen">
      <img className="screen" src={projectorScreen} alt="Projector Screen" />
      <img className="overlay" src={pirateShip} alt="Pirate Ship" />
    </div>
  );
}

export default ImageScreen;
