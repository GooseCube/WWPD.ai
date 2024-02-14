/* eslint-disable react/prop-types */
// React
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { delay } from "../../../modules/momentum/speechModules/helperFunctions";

function SidebarHeader({ icon }) {
  const [title, setTitle] = useState(null);
  const gameTitle = "What Would PDX Do ?";
  const animationTitle = ["", "What", "Would", "PDX", "Do", "?", ""];

  /**
   * On render animation for the game title
   */
  useEffect(() => {
    setTitle([]);
    const animateTitle = async () => {
      for (let index = 0; index < animationTitle.length; ++index) {
        await delay(300);
        setTitle((prevTitle) => [
          ...prevTitle,
          <div
            className="animate-letter"
            key={index}
            style={{ animationDelay: `${0.3}s` }}>
            {animationTitle[index]}
          </div>,
        ]);
        if (index + 1 >= animationTitle.length) {
          delay(300);
          setTitle(
            <div
              className="animate-letter"
              key={index}
              style={{ animationDelay: `${0.3}s` }}>
              {gameTitle}
            </div>
          );
        }
      }
    };
    animateTitle();
  }, []);

  return (
    <div className="sidebar-title mx-5 w-75 d-flex justify-content-around align-items-center">
      {/* <Image className="app-icon-img" src={icon} /> */}
      {title ? (
        title
      ) : (
        <div className="animate-letter" style={{ animationDelay: `${0.3}s` }}>
          {gameTitle}
        </div>
      )}
    </div>
  );
}

export default SidebarHeader;
