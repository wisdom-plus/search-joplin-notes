import { getApplications } from "@raycast/api";
import { useEffect, useState } from "react";
import { openJoplin } from "./applescripts";
import { JoplinBundleId } from "./constants";

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
