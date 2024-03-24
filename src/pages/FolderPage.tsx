import React, { useEffect, useState } from "react";
import styles from "../styles/FolderPage.module.css";
import LinkCardComponent from "../components/LinkCardComponent";
import { useRequest } from "../hooks/useRequest";
import FolderButton from "../components/FolderButton";
import styled from "styled-components";
import CommonModalComponent from "../components/CommonModalComponent";
import { useModalSetting } from "../hooks/useModalSetting";
import { FolderListType, LinkListType, LinkType } from "@/types";

interface linksType {
  folderName: string;
  list?: LinkType[];
}
const FolderPage = () => {
  const [folderInfo, setFolderInfo] = useState<FolderListType>({});
  const [modalType, setModalType] = useState({
    type: "",
    title: "",
    folderName: "",
    linkName: "",
  });
  const [links, setLinks] = useState<linksType>({ folderName: "", list: [] });

  const { show, modalOn, modalOff } = useModalSetting();

  const { data: linksData, request: linksRequest } = useRequest<LinkListType>({
    url: "api/users/1/links",
    method: "GET",
  });
  const { data, request } = useRequest({
    url: "api/users/1/folders",
    method: "GET",
  });

  const setLinkInfo = (name: string, id?: number) => {
    setLinks({ ...links, folderName: name });
    linksRequest(id ? { folderId: id } : undefined);
  };

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    if (data) {
      setFolderInfo(data);
      setLinkInfo("전체");
    }
  }, [data]);

  useEffect(() => {
    if (linksData) {
      setLinks({ ...links, list: (linksData as LinkListType).data });
    }
  }, [linksData]);

  return (
    <>
      <CommonModalComponent
        show={show}
        modalOff={modalOff}
        modalInfo={modalType}
      />
      <section className={styles.folder_main_section}>
        <LinkInput>
          <img src="/images/link.png" className="link_search_img" />
          <input
            className="link_search_input"
            placeholder="링크를 추가해 보세요"
          />
          <button className="link_search_button">추가하기</button>
        </LinkInput>
      </section>
      <section className={styles.folder_info_section}>
        <div className={styles.folder_search_input_box}>
          <img src="/images/Search.svg" />
          <input
            className={styles.folder_search_input}
            placeholder="링크를 검색해 보세요"
          />
        </div>
        {folderInfo?.data && (
          <FolderSortWrapper>
            <div className="folder_wrapper">
              <FolderButton
                request={() => setLinkInfo("전체")}
                isActive={"전체" === links?.folderName}
              >
                {"전체"}
              </FolderButton>
              {folderInfo?.data?.map((e) => {
                return (
                  <FolderButton
                    request={() => setLinkInfo(e.name, e.id)}
                    isActive={e.name === links?.folderName}
                  >
                    {e.name}
                  </FolderButton>
                );
              })}
            </div>
            <button
              className="add-folder-btn"
              onClick={() => {
                setModalType({
                  title: "폴더 추가",
                  type: "folder_add",
                  folderName: "",
                  linkName: "",
                });
                modalOn();
              }}
            >
              폴더 추가 +
            </button>
          </FolderSortWrapper>
        )}

        {links?.folderName && (
          <LinkInfo>
            <p className="info_header">{links?.folderName}</p>
            {links.folderName === "전체" ? (
              <></>
            ) : (
              <div className="info_button">
                <button
                  onClick={() => {
                    setModalType({
                      title: "폴더 공유",
                      type: "folder_share",
                      folderName: links.folderName,
                      linkName: "",
                    });
                    modalOn();
                  }}
                >
                  <img src="/images/share.png" />
                  <span>공유</span>
                </button>
                <button
                  onClick={() => {
                    setModalType({
                      title: "폴더 이름 변경",
                      type: "folder_rename",
                      folderName: links.folderName,
                      linkName: "",
                    });
                    modalOn();
                  }}
                >
                  <img src="/images/pen.png" />
                  <span>이름변경</span>
                </button>
                <button
                  onClick={() => {
                    setModalType({
                      title: "폴더 삭제",
                      type: "folder_delete",
                      folderName: links.folderName,
                      linkName: "",
                    });
                    modalOn();
                  }}
                >
                  <img src="/images/delete.png" />
                  <span>삭제</span>
                </button>
              </div>
            )}
          </LinkInfo>
        )}

        {links?.list && links?.list.length > 0 ? (
          <article className={styles.folder_card_body}>
            {links?.list?.map((e) => {
              return (
                <LinkCardComponent
                  imgSrc={e.image_source}
                  createdAt={e.created_at}
                  desc={e.description}
                  url={e.url}
                />
              );
            })}
          </article>
        ) : (
          <div>
            <p className={styles.folder_nolink}>저장된 링크가 없습니다</p>
          </div>
        )}
        {/* <Stylebutton color={color} /> */}
        <FolderAddButton
          onClick={() => {
            setModalType({
              title: "폴더 추가",
              type: "folder_add",
              folderName: "",
              linkName: "",
            });
            modalOn();
          }}
        >
          폴더 추가 +
        </FolderAddButton>
      </section>
    </>
  );
};

export default FolderPage;

const FolderSortWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  margin-bottom: 24px;
  width: 100%;
  height: fit-content;
  @media (max-width: 767px) {
    margin-bottom: 28px;
  }
  .folder_wrapper {
    display: flex;
    gap: 8px;
    box-sizing: border-box;
    flex-wrap: wrap;
  }
  .add-folder-btn {
    background-color: transparent;
    outline: none;
    color: #6d6afe;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.3px;
    border-width: 0px;
    cursor: pointer;

    @media (max-width: 767px) {
      display: none;
    }
  }
`;
const LinkInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  width: 100%;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: start;
    gap: 12px;
  }
  .info_header {
    color: #000;

    /* Linkbrary/h3-semibold */
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.2px;
    @media (max-width: 767px) {
      font-size: 20px;
    }
  }
  .info_button {
    display: flex;
    gap: 12px;
    button {
      color: var(--Linkbrary-gray60, #9fa6b2);

      /* Linkbrary/body2-semibold */
      font-family: Pretendard;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;

      outline: none;
      border: none;
      background-color: transparent;
      cursor: pointer;

      display: flex;
      gap: 4px;
      align-items: center;

      @media (max-width: 767px) {
        padding: 0px;
      }
    }
  }
`;

const LinkInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  position: relative;
  width: 100%;
  padding: 16px 20px;
  border-radius: 15px;
  border: 1px solid var(--Linkbrary-primary-color, #6d6afe);
  background: var(--Linkbrary-white, #fff);
  @media (max-width: 767px) {
    width: 305px;
    padding: 8px 10px;
    gap: 8px;
  }
  @media (min-width: 768px) and (max-width: 1123px) {
    width: 664px;
  }
  .link_search_img {
    width: 20px;
    height: 20px;
    @media (max-width: 767px) {
      width: 16px;
      height: 16px;
    }
  }
  .link_search_input {
    flex-grow: 1;

    /* Linkbrary/body1-regular */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    border: none;
    &:focus {
      outline: none;
    }
    ::placeholder {
      color: var(--Linkbrary-gray60, #9fa6b2);
    }

    @media (max-width: 767px) {
      font-size: 14px;
      line-height: normal;
    }
  }
  .link_search_button {
    display: flex;
    width: 80px;
    padding: 10px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    border: none;
    background: var(
      --gra-purpleblue-to-skyblue,
      linear-gradient(91deg, #6d6afe 0.12%, #6ae3fe 101.84%)
    );

    color: var(--Grey-Light, #f5f5f5);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    white-space: nowrap;
  }
`;
const FolderAddButton = styled.button`
  @media (max-width: 767px) {
    display: flex;
  }
  display: none;
  padding: 8px 24px;
  align-items: flex-start;
  gap: 20px;
  border-radius: 20px;
  border: 1px solid var(--Linkbrary-white, #fff);
  background: var(--Linkbrary-primary-color, #6d6afe);
  color: var(--Linkbrary-gray10, #e7effb);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.3px;

  position: fixed;
  bottom: 101px;
  z-index: 30;
`;
