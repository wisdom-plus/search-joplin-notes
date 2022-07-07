import { ActionPanel, Detail, List, Action } from "@raycast/api";
import { useState } from "react";

export default function Command() {
  const [searchText, setSearchText] = useState("");

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
