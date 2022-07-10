import fetch from "node-fetch";
import { API_URL } from "./constants";

export const fetchdata = (keyword: string) => {
  fetch(API_URL(keyword)),
    {
      method: "GET",
    };
};
