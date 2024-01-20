/**
 * The styles for the screen position are located in:
 * /modules/mapGridPositions/meetingPlaces.js
 * 
 * To quickly modify the screen {position, width, height}
 * copy/paste the return() to bottom of file and comment out
 * copy the first commented out code and place it in the imageScreen() function
 * and uncomment.
 * Then, uncomment the function ImageScreen({ overlayImages })
 * and comment out the other.
 * 
 * This should allow you to use the /styles/styles.css .screen & .overlay
 * to adjust position and sizing
 */
import React, { useState, useEffect } from "react";
import screenImage from "../../assets/art/pull_down_screen.png";

import "./styles/styles.css";

// function ImageScreen({ overlayImages, screenStyles, overlayStyles }) {
function ImageScreen({ overlayImages }) {
  const [currentImage, setCurrentImage] = useState(overlayImages[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % overlayImages.length);
      setCurrentImage(overlayImages[index]);
    }, 3000);

    return () => clearInterval(timer);
  }, [overlayImages, index]);

  return (
    <div className="image-screen" style={{ position: "relative" }}>
      <img
        className="screen"
        src={screenImage}
        alt="Projector Screen"
        // style={screenStyles}
      />
      <img
        className="overlay"
        src={currentImage}
        alt="Overlay Image"
        // style={overlayStyles}
      />
    </div>
  );
}

export default ImageScreen;

  // return (
  //   <div className="image-screen" style={{ position: "relative" }}>
  //     <img
  //       className="screen"
  //       src={screenImage}
  //       alt="Projector Screen"
  //       style={screenStyles}
  //     />
  //     <img
  //       className="overlay"
  //       src={currentImage}
  //       alt="Overlay Image"
  //       style={overlayStyles}
  //     />
  //   </div>
  // );