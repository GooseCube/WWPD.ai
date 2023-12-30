import styled from "styled-components";
import { calculateLeftX, calculateTopY } from "../keyPressListener";

/**
 * Styled Component allows the sprite character to change based on selection
 */
export const Sprite = styled.div`
  transform: ${({ player }) =>
    `translate3d(${calculateLeftX(player.x)}, ${calculateTopY(player.y)}, 0)`};
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
