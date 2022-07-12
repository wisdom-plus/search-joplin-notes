import { List, getApplications, getPreferenceValues } from "@raycast/api";
import { useState, useEffect } from "react";
import fetch from "node-fetch";
import { runAppleScriptSync } from "run-appleScript";
import { NotesList } from "./components/NotesList";

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState<joplinjson>();
  const [apppath, setApppath] = useState<string>("");
  const [token, setToken] = useState("");

  type data = { id: string; title: string; body: string };
  type joplinjson = { items: data[] };

  useEffect(() => {
    setToken(() => getPreferenceValues().joplin_token);
    getApplications().then((res) => {
      const path = res.filter((app) => app.bundleId === "net.cozic.joplin-desktop")[0].path;
      setApppath(() => path);
    });
    runAppleScriptSync(`
    if application "Joplin" is not running then
      tell application "Joplin" to run
      delay 2.5
      tell application "System Events"
        set visible of process "Joplin" to false
      end tell
      do shell script "open -b com.raycast.macos"
    end if`);
  }, []);

  const fetchdata = (keyword: string): Promise<joplinjson> =>
    fetch(`http://localhost:41184/search?query=${keyword}*&fields=id,title,body&token=${token}`, {
      method: "GET",
    }).then((res) => res.json() as Promise<joplinjson>);

  useEffect(() => {
    if (searchText) {
      fetchdata(searchText).then((data) => {
        setResult(() => data);
      });
    }
  }, [searchText]);

  return (
    <List searchBarPlaceholder="Search keywords" onSearchTextChange={setSearchText}>
      {result?.items.map((data) => (
        <NotesList data={data} path={apppath} key={data.id} />
      ))}
    </List>
  );
}
