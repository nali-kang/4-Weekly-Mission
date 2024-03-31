import { useState } from "react";
import { BASE_URL } from "../utils/constants";

export const useRequest = <T>({
  url,
  method,
}: {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
}) => {
  const [data, setData] = useState<T>({} as T);

  const requestFetch = (body?: Record<string, any>) => {
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
          throw Error(response.status + "");
        }
      })
      .then((result) => {
        setData(result);
      });
  };

  return { data, request: (body?: Record<string, any>) => requestFetch(body) };
};
