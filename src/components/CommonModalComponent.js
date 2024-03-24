import React, { useEffect } from "react";
import { styled } from "styled-components";

const CommonModalComponent = ({ show, modalOff }) => {
  useEffect(() => {
    if (show) {
      // eslint-disable-next-line no-restricted-globals
      history.pushState(null, "", location.href);
      window.addEventListener("popstate", modalOff);
      document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      window.removeEventListener("popstate", modalOff);
    };
  }, [show]);

  return (
    <ModalComponent show={show}>
      <button onClick={modalOff}>닫기</button>
    </ModalComponent>
  );
};

const ModalComponent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000;
  opacity: 0.4;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  display: ${(props) => (props.show ? "flex" : "none")};

  justify-content: center;
  align-items: center;
`;
export default CommonModalComponent;
