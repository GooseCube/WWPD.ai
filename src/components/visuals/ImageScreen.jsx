import React, { useState, useEffect } from "react";
import "./styles/styles.css";
import screenImage from "../../assets/art/blue_screen.svg";

function ImageScreen({ overlayImages, screenStyles, overlayStyles }) {
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
    <div className="image-screen">
      <img
        className="screen"
        src={screenImage}
        alt="Projector Screen"
        style={screenStyles}
      />
      <img
        className="overlay"
        src={currentImage}
        alt="Overlay Image"
        style={overlayStyles}
      />
    </div>
  );
}

export default ImageScreen;
