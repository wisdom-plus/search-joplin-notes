import { List, showToast, Toast, Detail } from "@raycast/api";
import { useState, useEffect } from "react";
import { NotesList } from "./components/NotesList";
import { fetchnotes } from "./utils/api";
import { NoteData } from "./utils/types";
import { useGetPath } from "./utils/usegetpath";

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState<NoteData>();
  const [error, setError] = useState<Error>();

  const path = useGetPath();

  useEffect(() => {
    if (searchText) {
      fetchnotes(searchText)
        .then((data) => setResult(() => data))
        .catch((error) => {
          setError(() => error);
          showToast({
            style: Toast.Style.Failure,
            title: "Failure to fetch notes",
            message: "Please make sure Joplin is running",
          });
        });
    }
  }, [searchText]);

  return (
    <>
      {error?.message ? (
        <Detail />
      ) : (
        <List
          searchBarPlaceholder="Search keywords"
          onSearchTextChange={setSearchText}
          isLoading={result === undefined}
        >
          {result?.items.map((data) => (
            <NotesList data={data} path={path} key={data.id} />
          ))}
        </List>
      )}
    </>
  );
}
