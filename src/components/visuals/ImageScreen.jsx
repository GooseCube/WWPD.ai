/* eslint-disable react/prop-types */
/**
 * To quickly modify the screen {position, width, height}
 * copy/paste the return() to the bottom of file and comment it out.
 * Copy the other commented out code and place it in the imageScreen() function
 * and uncomment.
 * Then, uncomment the function ImageScreen({ overlayImages })
 * and comment out the other.
 *
 * This should allow you to use the /styles/styles.css .screen & .overlay
 * to adjust position and sizing of image screen and the images
 */
// React
import { useState, useEffect, useContext } from "react";

// Context Providers
import { AuthContext } from "../contextProviders/AuthProvider";

// Image Assets
import screenImage from "../../assets/art/pull_down_screen.png";

import "./styles/styles.css";

// Keep this commented ImageScreen() function DO NOT REMOVE
// function ImageScreen({ overlayImages }) {
function ImageScreen({ screenStyles, overlayStyles }) {
  const { moments } = useContext(AuthContext);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (moments) {
      const momentsArray = Object.values(moments);
      const lastMoment = momentsArray[momentsArray.length - 1];
      setImages(lastMoment.images);
    }
  }, [moments]);

  useEffect(() => {
    if (images && images.length > 0) {
      setCurrentImage(images[0]);
      const timer = setInterval(() => {
        setIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % images.length;
          setCurrentImage(images[newIndex]);
          return newIndex;
        });
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [images]);

  return (
    images &&
    images.length > 0 && (
      <div className="image-screen" style={{ position: "relative" }}>
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
    )
  );
}

export default ImageScreen;

// To move image-screen, use this return in place of the current return() component
// return (
//   <div className="image-screen" style={{ position: "relative" }}>
//     <img
//       className="screen"
//       src={screenImage}
//       alt="Projector Screen"
//     />
//     <img
//       className="overlay"
//       src={currentImage}
//       alt="Overlay Image"
//     />
//   </div>
// );
