import React, { useEffect, useState } from "react";
import styles from "../styles/FolderPage.module.css";
import LinkCardComponent from "../components/LinkCardComponent";
import { useRequest } from "../hooks/useRequest";
import FolderButton from "../components/FolderButton";
import styled from "styled-components";

const FolderPage = () => {
  const [folderInfo, setFolderInfo] = useState({});
  const [links, setLinks] = useState({ folderName: "", list: [] });

  const { data: linksData, request: linksRequest } = useRequest({
    url: "api/users/1/links",
    method: "GET",
  });
  const { data, request } = useRequest({
    url: "api/users/1/folders",
    method: "GET",
  });

  function setLinkInfo(name, id) {
    setLinks({ ...links, folderName: name });
    linksRequest(id ? { folderId: id } : undefined);
  }

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    if (data) {
      setFolderInfo(data);
    }
  }, [data]);

  useEffect(() => {
    if (linksData) {
      setLinks({ ...links, list: linksData.data });
    }
  }, [linksData]);

  return (
    <>
      <section className={styles.folder_main_section}>
        <img
          src={folderInfo?.folder?.owner?.profileImageSource ?? ""}
          className={styles.folder_user_img}
        />
        <p className={styles.folder_user_name}>
          {folderInfo?.folder?.owner?.name ?? ""}
        </p>
        <strong className={styles.folder_name}>
          {folderInfo?.folder?.name ?? ""}
        </strong>
      </section>
      <section className={styles.folder_info_section}>
        <div className={styles.folder_search_input_box}>
          <img src="/images/Search.svg" />
          <input
            className={styles.folder_search_input}
            placeholder="링크를 검색해 보세요"
          />
        </div>
        <FolderSortWrapper>
          <div className="folder_wrapper">
            <FolderButton
              name={"전체"}
              request={() => setLinkInfo("전체")}
              isActive={"전체" === links?.folderName}
            >
              전체
            </FolderButton>
            {folderInfo?.data?.map((e) => {
              return (
                <FolderButton
                  name={e.name}
                  request={() => setLinkInfo(e.name, e.id)}
                  isActive={e.name === links?.folderName}
                />
              );
            })}
          </div>
          <button className="add-folder-btn">폴더 추가 +</button>
        </FolderSortWrapper>
        <p>{links?.folderName}</p>
        {links?.list ? (
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
      </section>
    </>
  );
};

export default FolderPage;

const FolderSortWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  .folder_wrapper {
    display: flex;
    gap: 8px;
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
  }
`;
