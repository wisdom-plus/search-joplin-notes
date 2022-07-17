import { getPreferenceValues } from "@raycast/api";
import { pingjoplin } from "./api";

export const API_URL = async (keyword: string): Promise<string> => {
  const port = await pingjoplin();
  return `http://localhost:${port}/search?query=${keyword}*&fields=id,title,body&token=${API_Token}`;
};
export const API_Token = getPreferenceValues().joplin_token;

export const RaycastBundleId = "com.raycast.macos";

export const JoplinBundleId = "net.cozic.joplin-desktop";
