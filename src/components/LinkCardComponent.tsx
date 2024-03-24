import React, { useState } from "react";
import styles from "../styles/FolderPage.module.css";
import { formatDate, setBeforeDate } from "../utils/commonUtil";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import CardDropdownComponent from "./CardDropdownComponent";

type props = {
  imgSrc?: string;
  createdAt: string;
  desc?: string;
  url: string;
  type?: "default" | "static";
};

const LinkCardComponent = ({
  imgSrc,
  createdAt,
  desc,
  url,
  type = "default",
}: props) => {
  const [show, setShow] = useState(false);

  const curDate = new Date(createdAt);
  const noImage = "/images/card_no_img.png";

  return (
    <Link to={url} target="_blank" className={styles.card_link}>
      <div className={styles.folder_card}>
        <img src={imgSrc ?? noImage} className={styles.card_img} />
        <div className={styles.card_info}>
          <p className={styles.card_date_before}>{setBeforeDate(curDate)}</p>
          <p className={styles.card_desc}>{desc}</p>
          <p className={styles.card_date}>{formatDate(curDate)}</p>
        </div>
      </div>
      <div className="link_absolute_div">
        {type === "default" ? (
          <LinkStar>
            <img src="/images/star.svg" />
          </LinkStar>
        ) : (
          <></>
        )}
        {type === "default" ? (
          <KebabButton
            onClick={(e) => {
              e.preventDefault();
              setShow(!show);
            }}
          >
            <img src="/images/kebab.svg" />
            <CardDropdownComponent show={show} url={url} />
          </KebabButton>
        ) : (
          <></>
        )}
      </div>
    </Link>
  );
};
const LinkStar = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  border: 0;
  background-color: transparent;
`;
const KebabButton = styled.button`
  position: absolute;
  top: 215px;
  right: 20px;
  border: 0;
  background-color: transparent;
  z-index: 6;
  cursor: pointer;
`;
export default LinkCardComponent;
