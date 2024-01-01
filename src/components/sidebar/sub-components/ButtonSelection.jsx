import Image from "react-bootstrap/Image";

function ButtonSelection({ buttonText, image, altText, useStateParam, handleStateEvent }) {
  return (
    <div
      className="sidebar-button mb-3"
      onClick={() => handleStateEvent(!useStateParam)}>
      <Image className="sidebar-img" src={image} alt={altText} /> {buttonText}
    </div>
  );
}

export default ButtonSelection;