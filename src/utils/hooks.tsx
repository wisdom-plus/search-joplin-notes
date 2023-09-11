import { showToast, Toast, getApplications } from "@raycast/api";
import { useCachedState, useFetch } from "@raycast/utils";
import { useEffect } from "react";
import { pingjoplin } from "./api";
import { JoplinBundleId, API_URL } from "./constants";
import type { CacheData } from "./types";

export const useGetPath = () => {
  const [, setPath] = useCachedState("path", { cached: false, path: null });

  useEffect(() => {
    getApplications().then((res) => {
      const joplinpath = res.filter((app) => app.bundleId === JoplinBundleId)[0].path;
      setPath((prev) => ({ ...prev, cached: true, path: joplinpath }));
    });
  }, []);
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
  const { isLoading, data, error } = useFetch(URL, {
    keepPreviousDate: true,
    onError: () =>
      showToast({
        style: Toast.Style.Failure,
        title: "Error: Not fetch notes",
        message: "Unable to communicate with joplin server",
      }),
  });

  return { isLoading, data, error };
};
