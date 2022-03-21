import { useRef, useEffect } from "react";
import {
  LogoContainer,
  ResizeBox,
  BoxLogo,
  IBF,
  IB,
  IBText,
  IBTextContainer
} from "./styles";

export const LogoIB = () => {
  const refBoxLogo = useRef(null);
  const LogoResizeBox = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      refBoxLogo.current.children[1].classList.remove("animationIBF");
    }, 2000);
  }, []);

  function endAnimation() {
    setTimeout(() => {
      LogoResizeBox.current.classList.remove("logoContainerFullScreen");
      refBoxLogo.current.classList.remove("BoxLogoCenter");
    }, 700);
  }

  function elementPositionchanged() {
    LogoResizeBox.current.style.position = "relative";
  }
  function transitionEndRight() {
    refBoxLogo.current.children[2].classList.remove("animationIB");
  }
  function transitionEndCenter() {
    refBoxLogo.current.children[0].classList.remove("animationIBF");
  }

  return (
    <LogoContainer>
      <ResizeBox
        onTransitionEnd={elementPositionchanged}
        ref={LogoResizeBox}
        className={"logoContainer logoContainerFullScreen"}
      >
        <BoxLogo ref={refBoxLogo} className={"BoxLogoCenter"}>
          <IBF onTransitionEnd={endAnimation} className={"IBFl animationIBF"}>
            <div></div>
          </IBF>

          <IBF
            onTransitionEnd={transitionEndRight}
            className={"IBFr animationIBF"}
          >
            <div></div>
          </IBF>

          <IB onTransitionEnd={transitionEndCenter} className={"animationIB"}>
            <IBTextContainer>
              <IBText translate={"no"}>IB</IBText>
            </IBTextContainer>
          </IB>
        </BoxLogo>
      </ResizeBox>
    </LogoContainer>
  );
};
