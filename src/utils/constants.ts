import { getPreferenceValues } from "@raycast/api";

export const API_URL = (keyword: string): string =>
  `http://localhost:41184/search?query=${keyword}*&fields=id,title,body&token=${API_Token}`;

export const API_Token = getPreferenceValues().joplin_token;

export const RaycastBundleId = "com.raycast.macos";

export const JopliBundleId = "net.cozic.joplin-desktop";
