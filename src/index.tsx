import { List, Detail } from "@raycast/api";
import { useState } from "react";
import { NotesList } from "./components/NotesList";
import { useNoteFetch } from "./utils/hooks";

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const [error] = useState<Error>();

  const { isLoading, data } = useNoteFetch(searchText);

  return (
    <>
      {error ? (
        <Detail isLoading={isLoading} markdown={`# ${error.message}`} />
      ) : (
        <List searchBarPlaceholder="Search keywords" onSearchTextChange={setSearchText} isLoading={searchText === ""}>
          {data?.items.map((note) => <NotesList data={note} key={note.id} />)}
        </List>
      )}
    </>
  );
}
