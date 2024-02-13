/* eslint-disable react/prop-types */
// React
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { delay } from "../../../modules/momentum/speechModules/helperFunctions";

function SidebarHeader({ icon }) {
  const gameTitle = "G . A . M . E .";
  const animationTitle = ["", "G . ", "A . ", "M .", "E .", ""];
  const [title, setTitle] = useState(null);

  // Inside your component
  useEffect(() => {
    setTitle([]);

    const animateTitle = async () => {
      for (let index = 0; index < animationTitle.length; ++index) {
        await delay(index * 300); // delay in milliseconds
        setTitle((prevTitle) => [
          ...prevTitle,
          <div
            className="animate-letter game-title"
            key={index}
            style={{ animationDelay: `${index * 0.3}s` }}>
            {animationTitle[index]}
          </div>,
        ]);
        if (index + 1 >= animationTitle.length) {
          delay(index * 300);
          setTitle(null);
        }
      }
    };

    animateTitle();
  }, []);

  return (
    <div className="sidebar-title mx-5 w-75 d-flex justify-content-around align-items-center">
      <Image className="app-icon-img" src={icon} />
      <p className="game-title pt-3">{title ? title : gameTitle}</p>
    </div>
  );
}

export default SidebarHeader;
