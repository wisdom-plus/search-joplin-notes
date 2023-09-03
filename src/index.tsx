import { List, showToast, Toast, Detail } from "@raycast/api";
import { useState, useEffect } from "react";
import { NotesList } from "./components/NotesList";
import { fetchnotes } from "./utils/api";
import { NoteData } from "./utils/types";
import { useGetPath, usePingJoplin } from "./utils/hooks";

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState<NoteData>();
  const [error, setError] = useState<Error>();
  
  usePingJoplin()

  const path = useGetPath();

  const fetch = async (keyword: string) => {
    try {
      const result = await fetchnotes(keyword);
      setResult(() => result);
    } catch (error) {
      setError(() => error as Error);
      showToast({
        style: Toast.Style.Failure,
        title: "Failure to fetch notes",
        message: "Please make sure Joplin is running",
      });
    }
  };

  useEffect(() => {
    if (searchText === "") {
      setResult(() => undefined);
    } else {
      fetch(searchText);
    }
  }, [searchText]);

  return (
    <>
      {error ? (
        <Detail markdown={`# ${error.message}`} />
      ) : (
        <List searchBarPlaceholder="Search keywords" onSearchTextChange={setSearchText} isLoading={searchText === ""}>
          {result?.items.map((data) => (
            <NotesList data={data} path={path} key={data.id} />
          ))}
        </List>
      )}
    </>
  );
}
