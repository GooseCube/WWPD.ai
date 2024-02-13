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
      className="sidebar-button d-flex mb-3"
      onClick={() =>
        dispatch({ type: showProviderType, payload: !show })
      }>
      <Image className="sidebar-btn-img" src={image} alt={altText} />{" "}
      <div className="sidebar-btn-title">{buttonText}</div>
    </div>
  );
}

export default ButtonSelection;
