import { ActionPanel, Detail, List, Action } from "@raycast/api";
import { useState, useEffect } from "react";
import fetch from "node-fetch";

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState<joplinjson>();

  type data = { id: string; title: string; body: string };
  type joplinjson = { items: data[] };

  const fetchdata = (keyword: string): Promise<joplinjson> =>
    fetch(
      `http://localhost:41184/search?query=${keyword}*&fields=id,title,body&token=0598ef0e76d6a114110b90e61fe90d02aeda313a639d686226dfb236172c79b75be66e976855e1a92dcb5a5492a15008d4ec07faafb16db39259df699d5ad840`,
      { method: "GET" }
    ).then((res) => res.json() as Promise<joplinjson>);

  useEffect(() => {
    if (searchText) {
      fetchdata(searchText).then((data) => {
        setResult(() => data);
      });
    }
  }, [searchText]);

  return (
    <List searchBarPlaceholder="Search keywords" onSearchTextChange={setSearchText}>
      {/* <List.Item
            icon="list-icon.png"
            title="Greeting"
            actions={
              <ActionPanel>
                <Action.Push title="Show Details" target={<Detail markdown="# Hey! 👋" />} />
              </ActionPanel>
            }
          /> */}
      {result?.items.map((data) => (
        <List.Item icon="list-icon.png" title={data.title} key={data.id} />
      ))}
    </List>
  );
}
