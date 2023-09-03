import { getApplications } from "@raycast/api";
import { useCachedState } from '@raycast/utils';
import { useEffect, useState } from "react";
import { openJoplin } from "./applescripts";
import { JoplinBundleId } from "./constants";
import type { CacheData } from './types';

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
  const [port, setPort] = useCachedState<CacheData>('port', { cached: false, port: 41183 })

  useEffect(()=> {
    if (!port.cached){
      console.log('test')
      setPort((prev)=>({ ...prev,cached: true, port: 41184}))
    }
  }, [port])


  return port;
}
