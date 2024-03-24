import { BASE_URL } from "./constants";

export const getRequestApi = (url: string, query: any) => {
  return fetch(BASE_URL + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw Error(response.status + "");
    }
  });
};

export const postReqeustApi = (url: string, body: any) => {
  return fetch(BASE_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw Error(response.status + "");
    }
  });
};
