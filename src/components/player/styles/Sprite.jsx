import styled from "styled-components";
import { calculateLeftX, calculateTopY } from "../modules/keyPressListener";
import isPropValid from "@emotion/is-prop-valid";

// export const Sprite = styled.div.withConfig({
//   shouldForwardProp: (prop) => isPropValid(prop) && prop !== "player",
// })`
//   position: absolute;
//   left: ${({ player }) => calculateLeftX(player.x)};
//   top: ${({ player }) => calculateTopY(player.y)};
//   background-image: ${({ player }) =>
//     `url(src/assets/characters/${player.name}.png)`};
//   &.grid-cell {
//     // Add your grid-cell styles here
//   }
//   &.stand-${({ player }) => player.direction} {
//     // Add your stand-direction styles here
//   }
//   &.walk-${({ player }) => player.direction}-${({ player }) => player.frame} {
//     // Add your walk-direction-frame styles here
//   }
// `;

export const Sprite = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "player",
})`
  position: absolute;
  left: ${({ player }) => calculateLeftX(player.x)};
  top: ${({ player }) => calculateTopY(player.y)};
  width: 32px;
  height: 32px;
  transition: top 0.2s ease, left 0.2s ease;
  zoom: 1.25;
  background-image: ${({ player }) =>
    `url(src/assets/characters/${player.name}.png)`};
  &.grid-cell {
    // Add your grid-cell styles here
  }
  &.stand-${({ player }) => player.direction} {
    // Add your stand-direction styles here
  }
  &.walk-${({ player }) => player.direction}-${({ player }) => player.frame} {
    // Add your walk-direction-frame styles here
  }
`;
