import React, { useState } from "react";
import { styled } from "styled-components";
import { useModalSetting } from "../hooks/useModalSetting";
import CommonModalComponent from "./CommonModalComponent";

type props = {
  show: boolean;
  url: string;
};

const CardDropdownComponent = ({ show, url }: props) => {
  const [modalType, setModalType] = useState({
    type: "",
    title: "",
    folderName: "",
    linkName: "",
  });
  const { show: modalShow, modalOn, modalOff } = useModalSetting();
  return (
    <DropdownContainer>
      <CommonModalComponent
        show={modalShow}
        modalOff={modalOff}
        modalInfo={modalType}
      />
      {show ? (
        <div className="dropdown_comp">
          <button
            className="link_button"
            onClick={() => {
              setModalType({
                title: "링크 삭제",
                type: "link_delete",
                folderName: "",
                linkName: url,
              });
              modalOn();
            }}
          >
            삭제하기
          </button>
          <button
            className="link_button"
            onClick={() => {
              setModalType({
                title: "폴더에 추가",
                type: "into_folder",
                folderName: "",
                linkName: url,
              });
              modalOn();
            }}
          >
            폴더에 추가
          </button>
        </div>
      ) : (
        <></>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.section`
  height: 0;
  position: relative;
  .dropdown_comp {
    z-index: 20;
    width: 100px;
    position: absolute;
    top: 0;
    left: 0;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    background: var(--gray-light-gray-00, #fff);
    box-shadow: 0px 2px 8px 0px rgba(51, 50, 54, 0.1);
    .link_button {
      width: 100%;
      height: 30px;
      padding: 0;
      background-color: transparent;
      border: none;
      &:hover {
        color: var(--Linkbrary-primary-color, #6d6afe);
        background: var(--Linkbrary-gray10, #e7effb);
      }
    }
  }
`;
export default CardDropdownComponent;
