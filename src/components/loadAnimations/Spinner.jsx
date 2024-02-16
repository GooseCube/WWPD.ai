/* eslint-disable react/prop-types */
import Spinner from "react-bootstrap/Spinner";

/**
 * Circle spinner animation using react-bootstrap library.
 * attributes = { { className: "name", animation: "border", variant: "primary", more...} }
 * You can use animation type "border" || "grow"
 * Docs: https://react-bootstrap.netlify.app/docs/components/spinners
 * @param {object: {html attributes}} attributes
 * @returns spinner animation element
 */
function SpinnerAnimation({ attributes }) {
  return <Spinner {...attributes} />;
}

export default SpinnerAnimation;
