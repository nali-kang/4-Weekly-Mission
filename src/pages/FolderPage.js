import React, { useEffect, useState } from "react";
import styles from "../styles/FolderPage.module.css";
import { getRequestApi } from "../utils/requestApi";
import LinkCardComponent from "../components/LinkCardComponent";
import { useRequest } from "../hooks/useRequest";
import FolderButton from "../components/FolderButton";

const FolderPage = () => {
  const [folderInfo, setFolderInfo] = useState({});
  const [links, setLinks] = useState({});

  const { data: linksData, request: linksRequest } = useRequest({
    url: "api/users/1/links",
    method: "GET",
  });
  const { data, request } = useRequest({
    url: "api/users/1/folders",
    method: "GET",
  });

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
      setLinks(linksData);
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

        <div>
          <FolderButton name={"전체"} request={() => linksRequest()}>
            전체
          </FolderButton>
          {folderInfo?.data?.map((e) => {
            return (
              <FolderButton
                name={e.name}
                request={() => linksRequest({ folderId: e.id })}
              />
            );
          })}
        </div>

        {links?.data ? (
          <article className={styles.folder_card_body}>
            {links?.data?.map((e) => {
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
