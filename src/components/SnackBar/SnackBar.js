import React from "react";
import styled, { withTheme } from "styled-components";
import { createPortal } from "react-dom";
import { Transition } from "react-spring";
import SnackBar from "UI/SnackBar";
import { AnimatedExit as Exit } from "UI/Icons";
import { easePolyIn, easePolyOut } from "d3-ease";

const StyledExitButton = styled(Exit)`
  display: inline-block;
  margin-right: 4rem;
`;

function SimpleSnackBar({ children, onClose, show, where, timeout, theme }) {
  let timer;
  if (show && typeof timer === "undefined") {
    timer = window.setTimeout(onClose, timeout || 6000);
  }
  let closeButtonProps = {
    animationState: "enter",
    color: theme.colors.darkGrey,
    size: "tiny",
    onClick: () => {
      onClose();
      window.clearTimeout(timer);
    }
  };
  const snackBar = (
    <Transition
      items={show}
      from={{ o: 0, y: -100 }}
      enter={{ o: 1, y: 0 }}
      leave={{ o: 0, y: -100 }}
      config={{
        duration: 350,
        enter: { easing: easePolyOut },
        leave: { easing: easePolyIn }
      }}
      native
    >
      {show =>
        show &&
        (props => (
          <SnackBar {...props}>
            <StyledExitButton {...closeButtonProps} />
            {children}
          </SnackBar>
        ))
      }
    </Transition>
  );
  return createPortal(snackBar, where || document.body);
}

export default withTheme(SimpleSnackBar);
