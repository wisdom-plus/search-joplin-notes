import { List } from "@raycast/api";
import { useState, useEffect } from "react";
import { NotesList } from "./components/NotesList";
import { fetchnotes } from "./utils/api";
import { notedata } from "./utils/types";
import { useGetPath } from "./utils/usegetpath";

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState<notedata>();

  const path = useGetPath();

  useEffect(() => {
    if (searchText) {
      fetchnotes(searchText).then((data) => {
        setResult(() => data);
      });
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
