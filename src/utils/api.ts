import fetch from "node-fetch";
import { API_URL } from "./constants";
import type { NoteData } from "./types";

export const fetchnotes = async (keyword: string) => {
  console.log(API_URL("test"));
  const response = fetch(await API_URL(keyword), { method: "GET" }).then((res) => {
    if (res.ok) {
      return res.json() as Promise<NoteData>;
    } else {
      throw new Error("Error fetching notes");
    }
  });
  return response;
};

export const pingjoplin = async () => {
  const port = { port: 41184 };
  for (let portToTest = 41183; portToTest <= 41194; portToTest++) {
    const result = await fetch(`http://localhost:${portToTest}/ping`, { method: "GET" })
      .then((res) => {
        if (!res.ok && res.body === null) {
          throw new Error("Error pinging Joplin");
        }
        return res.body?.read().toString();
      })
      .catch(() => false);

    if (result == "JoplinClipperServer") {
      port.port = portToTest;
      break;
    }
  }
  return port.port;
};
