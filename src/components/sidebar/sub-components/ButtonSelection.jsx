/* eslint-disable react/prop-types */
import Image from "react-bootstrap/Image";

function ButtonSelection({
  buttonText,
  image,
  altText,
  show,
  showProviderType,
  dispatch,
}) {
  return (
    <div
      className="sidebar-button mb-3"
      onClick={() =>
        dispatch({ type: showProviderType, payload: !show.interface })
      }>
      <Image className="sidebar-btn-img" src={image} alt={altText} />{" "}
      {buttonText}
    </div>
  );
}

export default ButtonSelection;
