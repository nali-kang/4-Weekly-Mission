"use client";
import styles from "@/styles/BaseLayout.module.css";
import Header from "../Header";

type Props = {
  children: React.ReactNode;
};
const BaseLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
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
