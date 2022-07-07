import { ActionPanel, Detail, List, Action } from "@raycast/api";
import { useState, useEffect } from "react";
import fetch from "node-fetch";

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState<joplinjson>();

  type joplinjson = { items: [{ id: string; tile: string; body: string }] };

  const fetchdata = fetch(
    "http://localhost:41184/notes?token=0598ef0e76d6a114110b90e61fe90d02aeda313a639d686226dfb236172c79b75be66e976855e1a92dcb5a5492a15008d4ec07faafb16db39259df699d5ad840",
    { method: "GET" }
  );
  useEffect(() => {
    if (searchText) {
      fetchdata
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  }, [searchText]);

  return (
    <List searchBarPlaceholder="Search keywords" onSearchTextChange={setSearchText}>
      {searchText && (
        <>
          <List.Item
            icon="list-icon.png"
            title="Greeting"
            actions={
              <ActionPanel>
                <Action.Push title="Show Details" target={<Detail markdown="# Hey! 👋" />} />
              </ActionPanel>
            }
          />
          <List.Item icon="list-icon.png" title={searchText} />
        </>
      )}
    </List>
  );
}
