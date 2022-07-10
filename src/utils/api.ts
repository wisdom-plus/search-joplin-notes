import fetch from "node-fetch";

export const fetchdata = (keyword: string, token: string) => {
  fetch(`http://localhost:41184/search?query=${keyword}*&fields=id,title,body&token=${token}`, {
    method: "GET",
  });
};
