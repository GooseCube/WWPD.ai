import styled from "styled-components";
import { calculateLeftX, calculateTopY } from "../modules/keyPressListener";
import isPropValid from "@emotion/is-prop-valid";

export const Sprite = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "agent",
})`
  position: absolute;
  left: ${({ agent }) => calculateLeftX(agent.x)};
  top: ${({ agent }) => calculateTopY(agent.y)};
  width: 32px;
  height: 32px;
  transition: top 0.2s ease, left 0.2s ease;
  zoom: 1.25;
  background-image: ${({ agent }) =>
    `url(src/assets/characters/${agent.sprite})`};
  &.grid-cell {
    // Add your grid-cell styles here
  }
  &.stand-${({ agent }) => agent.direction} {
    // Add your stand-direction styles here
  }
  &.walk-${({ agent }) => agent.direction}-${({ agent }) => agent.frame} {
    // Add your walk-direction-frame styles here
  }
`;
