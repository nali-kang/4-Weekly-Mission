import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "../styles/BaseLayout.module.css";
import { useRequest } from "../hooks/useRequest";

const Header = () => {
  const [signinInfo, setSigninInfo] = useState({});

  const { data, request } = useRequest({
    url: "api/users/1",
    method: "GET",
  });

  useEffect(() => {
    if (data) {
      setSigninInfo(data);
    }
  }, [data]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      request();
    } else {
      setSigninInfo({});
    }
  }, []);

  return (
    <header className={styles.gnb}>
      <div className={styles.menu}>
        <a href="/">
          <img src="images/logo.svg" className={styles.logo} />
        </a>
        <div className={styles.between_blank}></div>
        {signinInfo ? (
          <div className={styles.profile_info}>
            <img
              className={styles.profile_img}
              src={signinInfo?.data?.[0]?.image_source ?? ""}
            />
            <p className={styles.profile_id}>
              {signinInfo?.data?.[0]?.email ?? ""}
            </p>
          </div>
        ) : (
          <a href="/signin" className={styles.signin + " " + styles.gradient}>
            로그인
          </a>
        )}
      </div>
    </header>
  );
};
const BaseLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className={styles.footer_body}>
        <div className={styles.footer_info}>
          <p className={styles.footer_author}>©codeit - 2023</p>
          <div className={styles.footer_link}>
            <a href="/privacy">Privacy Policy</a>
            <a href="/faq">FAQ</a>
          </div>
          <div className={styles.footer_sns}>
            <a href="https://www.facebook.com/?locale=ko_KR" target="_blank">
              <img src="./images/facebook.svg" />
            </a>
            <a href="https://twitter.com/?lang=ko" target="_blank">
              <img src="./images/twitter.svg" />
            </a>
            <a href="https://www.youtube.com/" target="_blank">
              <img src="./images/youtube.svg" />
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              <img src="./images/instagram.svg" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BaseLayout;
