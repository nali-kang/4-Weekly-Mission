import React, { useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
import { useRequest } from "../hooks/useRequest";
import { FolderListType } from "@/types";

type props = {
  show: boolean;
  modalOff: () => void;
  modalInfo: {
    type: string;
    title: string;
    folderName: string;
    linkName: string;
  };
};
const CommonModalComponent = ({ show, modalOff, modalInfo }: props) => {
  const { type, title, folderName, linkName } = modalInfo;

  const { data: folderData, request } = useRequest<FolderListType>({
    url: "api/users/1/folders",
    method: "GET",
  });
  const [selectLink, setSelectLink] = useState<number>(0);

  useEffect(() => {
    request();
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

  const customTitle = useMemo(() => {
    if (type === "folder_rename" || type === "folder_add") {
      return (
        <FolderHeader>
          <h2 className="modal_header">{title}</h2>
        </FolderHeader>
      );
    }
    if (type === "folder_share" || type === "folder_delete") {
      return (
        <FolderHeader>
          <h2 className="modal_header">{title}</h2>
          <p className="sub_title">{folderName}</p>
        </FolderHeader>
      );
    }
    if (type === "link_delete" || type === "into_folder") {
      return (
        <FolderHeader>
          <h2 className="modal_header">{title}</h2>
          <p className="sub_title">{linkName}</p>
        </FolderHeader>
      );
    }
  }, [type, title, folderName, linkName]);

  const info = useMemo(() => {
    if (type === "folder_add") {
      return (
        <FolderArticle>
          <input placeholder="내용 입력" />
          <AddButton>추가하기</AddButton>
        </FolderArticle>
      );
    }
    if (type === "folder_rename") {
      return (
        <FolderArticle>
          <input placeholder="내용 입력" defaultValue={folderName} />
          <AddButton>변경하기</AddButton>
        </FolderArticle>
      );
    }
    if (type === "folder_share") {
      return (
        <ShareArticle>
          <div>
            <button
              className="link_button"
              style={{ backgroundColor: "#FEE500" }}
            >
              <img src="/images/modal_kakao.png" />
            </button>
            <p>카카오톡</p>
          </div>
          <div>
            <button
              className="link_button"
              style={{ backgroundColor: "#1877F2" }}
            >
              <img src="/images/modal_facebook.png" />
            </button>
            <p>페이스북</p>
          </div>
          <div>
            <button className="link_button">
              <img src="/images/modal_link.png" />
            </button>
            <p>링크복사</p>
          </div>
        </ShareArticle>
      );
    }
    if (type === "folder_delete") {
      return <DeleteButton>삭제하기</DeleteButton>;
    }
    if (type === "link_delete") {
      return <DeleteButton>삭제하기</DeleteButton>;
    }
    if (type === "into_folder") {
      return (
        <>
          <IntoArticle>
            {(folderData as FolderListType)?.data?.map((e) => {
              return (
                <IntoArticleDD
                  isActive={selectLink === e.id}
                  onClick={() => {
                    setSelectLink(e.id);
                  }}
                >
                  <p className="link_name">
                    <span>{e.name}</span>
                    <span className="count">{e.link.count}개 링크</span>
                  </p>
                  {selectLink === e.id ? (
                    <img src="/images/link_check.png" />
                  ) : (
                    <></>
                  )}
                </IntoArticleDD>
              );
            })}
          </IntoArticle>
          <AddButton>추가하기</AddButton>
        </>
      );
    }
  }, [type, folderData, selectLink]);

  return (
    <ModalContainer show={show}>
      <ModalComponent>
        <button className="close_button" onClick={modalOff}>
          <img src="/images/modal_close_btn.png" />
        </button>
        {customTitle}
        {info}
      </ModalComponent>
    </ModalContainer>
  );
};

const ModalContainer = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  z-index: 50;
  display: ${(props) => (props.show ? "flex" : "none")};

  justify-content: center;
  align-items: center;
`;
const ModalComponent = styled.section`
  position: relative;
  width: 280px;
  height: auto;
  padding: 32px 40px;
  background-color: #f5f5f5;
  border-radius: 15px;
  border: 1px solid var(--Linkbrary-gray20, #ccd5e3);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  .close_button {
    position: absolute;
    top: 16px;
    right: 16px;
    padding: 0;
    border: 0;
    background-color: transparent;
    cursor: pointer;
  }
`;
const FolderHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  .modal_header {
    color: var(--Linkbrary-gray100, #373740);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 0;
  }
  .sub_title {
    color: var(--Linkbrary-gray60, #9fa6b2);
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
  }
`;
const FolderArticle = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  input {
    padding: 18px 15px;
    border-radius: 8px;
    border: 1px solid var(--Linkbrary-gray20, #ccd5e3);
    background: var(--Linkbrary-white, #fff);
    &::placeholder {
      color: var(--Linkbrary-gray60, #9fa6b2);
    }
  }
`;
const ShareArticle = styled.article`
  display: flex;
  gap: 32px;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    .link_button {
      padding: 12px;
      border-radius: 100%;
      border: 0;
      width: 42px;
      height: 42px;
      cursor: pointer;
    }
  }
`;
const DeleteButton = styled.button`
  display: flex;
  padding: 16px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 0;
  background: var(--Linkbrary-red, #ff5b56);
  padding: 16px 20px;
  color: var(--Grey-Light, #f5f5f5);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  width: 100%;
`;
const AddButton = styled.button`
  display: flex;
  padding: 16px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 0;
  background: var(
    --gra-purpleblue-to-skyblue,
    linear-gradient(91deg, #6d6afe 0.12%, #6ae3fe 101.84%)
  );
  color: var(--Grey-Light, #f5f5f5);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  width: 100%;
`;
const IntoArticle = styled.article`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
  width: 100%;
  height: 172px;
  overflow-y: auto;
`;
const IntoArticleDD = styled.dd<{ isActive: boolean }>`
  display: flex;
  width: 264px;
  margin: 0;
  padding: 8px;
  border-radius: 8px;
  text-align: start;
  justify-content: space-between;

  background: ${(props) => (props.isActive ? "#f0f6ff" : "transparent")};
  .link_name {
    display: flex;
    gap: 8px;
    align-items: center;
    color: ${(props) => (props.isActive ? "#6d6afe" : "#373740")};
    /* Linkbrary/body1-regular */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
  }
  .count {
    color: var(--Linkbrary-gray60, #9fa6b2);
    /* Linkbrary/body2-regular */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  &:hover {
    background: var(--Linkbrary-bg, #f0f6ff);
    .link_name {
      color: var(--Linkbrary-primary-color, #6d6afe);
    }
  }
  img {
    width: 14px;
    height: 14px;
  }
`;
export default CommonModalComponent;
