"use client";
import { useEffect } from "react";
import { useRequest } from "../hooks/useRequest";
import { OwnerList } from "../types";

import styles from "../styles/BaseLayout.module.css";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathName = usePathname();

  const { data: signinInfo, request } = useRequest<OwnerList>({
    url: "api/users/1",
    method: "GET",
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      request();
    }
  }, []);

  return (
    <header
      className={
        pathName?.indexOf("folder") ?? -1 > 0 ? styles.gnb_folder : styles.gnb
      }
    >
      <div className={styles.menu}>
        <a href="/">
          <img src="images/logo.svg" className={styles.logo} />
        </a>
        <div className={styles.between_blank}></div>
        {signinInfo.data && signinInfo.data.length > 0 ? (
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

export default Header;
