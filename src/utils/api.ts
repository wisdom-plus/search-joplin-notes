import fetch from "node-fetch";
import { API_URL } from "./constants";
import type { joplindata } from "./types";

export const fetchnotes = async (keyword: string) => {
  const response = await fetch(API_URL(keyword), { method: "GET" });
  if (response.ok) {
    return response.json() as Promise<joplindata>;
  }
};
