import { getApplications } from "@raycast/api";
import { useCachedState, useFetch } from "@raycast/utils";
import { useEffect, useState } from "react";
import { openJoplin } from "./applescripts";
import { pingjoplin } from "./api";
import { JoplinBundleId, API_URL } from "./constants";
import type { CacheData } from "./types";

export const useGetPath = () => {
  const [path, setPath] = useState("");

  useEffect(() => {
    getApplications().then((res) => {
      const joplinpath = res.filter((app) => app.bundleId === JoplinBundleId)[0].path;
      setPath(() => joplinpath);
    });
    openJoplin();
  }, []);

  return path;
};

export const usePingJoplin = () => {
  const [port, setPort] = useCachedState<CacheData>("port", { cached: false, port: 41183 });

  useEffect(() => {
    if (!port.cached) {
      (async () => {
        const pingPort = await pingjoplin();
        setPort((prev) => ({ ...prev, cached: true, port: pingPort }));
      })();
    }
  }, []);

  return port;
};

export const useNoteFetch = (keyword: string) => {
  const { port } = usePingJoplin();
  const URL = API_URL(keyword, port);
  const { isLoading, data, error } = useFetch(URL, { keepPreviousDate: true });

  return { isLoading, data, error };
};
