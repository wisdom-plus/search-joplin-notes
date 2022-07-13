import fetch from "node-fetch";
import { API_URL } from "./constants";
import type { NoteData } from "./types";

export const fetchnotes = (keyword: string) => {
  const response = fetch(API_URL(keyword), { method: "GET" }).then((res) => {
    if (res.ok) {
      return res.json() as Promise<NoteData>;
    } else {
      throw new Error(res.statusText);
    }
  });
  return response;
};
