import { ActionPanel, Detail, List, Action, getApplications, getPreferenceValues } from "@raycast/api";
import { useState, useEffect } from "react";
import fetch from "node-fetch";
import { runAppleScript, runAppleScriptSync } from "run-appleScript";

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
    runAppleScript('tell application "Joplin" to activate').then(() => console.log("Joplin is running"));
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
        <List.Item
          icon="list-icon.png"
          title={data.title}
          key={data.id}
          actions={
            <ActionPanel>
              <Action.Push
                title={data.title}
                target={
                  <Detail
                    markdown={data.body}
                    actions={
                      <ActionPanel>
                        <Action.Open title="Open Note" target={apppath} />
                      </ActionPanel>
                    }
                  />
                }
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
