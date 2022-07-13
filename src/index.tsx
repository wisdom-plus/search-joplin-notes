import { List } from "@raycast/api";
import { useState, useEffect } from "react";
import { NotesList } from "./components/NotesList";
import { fetchnotes } from "./utils/api";
import { NoteData } from "./utils/types";
import { useGetPath } from "./utils/usegetpath";

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState<NoteData>();

  const path = useGetPath();

  useEffect(() => {
    if (searchText) {
      try {
        fetchnotes(searchText).then((data) => setResult(() => data));
      } catch {
        console.log("error");
      }
    }
  }, [searchText]);

  return (
    <List searchBarPlaceholder="Search keywords" onSearchTextChange={setSearchText}>
      {result?.items.map((data) => (
        <NotesList data={data} path={path} key={data.id} />
      ))}
    </List>
  );
}
