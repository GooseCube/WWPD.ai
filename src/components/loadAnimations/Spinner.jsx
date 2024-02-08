/* eslint-disable react/prop-types */
import Spinner from "react-bootstrap/Spinner";

/**
 * Circle spinner animation using react-bootstrap library.
 * attributes = { { className: "name", animation: "border", variant: "primary", more...} }
 * @param {object: {html attributes}} atributes
 * @returns
 */
function SpinnerAnimation({ attributes }) {
  return <Spinner {...attributes} animation="border" />;
}

export default SpinnerAnimation;
