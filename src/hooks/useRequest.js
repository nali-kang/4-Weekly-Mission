import { useState } from "react";
import { BASE_URL } from "../utils/constants";

export const useRequest = ({ url, method }) => {
  const [data, setData] = useState({});

  const requestFetch = (body) => {
    let apiUrl = url;
    if (method === "GET") {
      const query = body
        ? Object.keys(body).map((e) => {
            return e + "=" + body[e];
          })
        : "";
      apiUrl = url + "?" + query;
    }
    fetch(BASE_URL + apiUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: method === "GET" ? null : JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw Error(response.status);
        }
      })
      .then((result) => {
        setData(result);
      });
  };

  return { data, request: (body) => requestFetch(body) };
};
