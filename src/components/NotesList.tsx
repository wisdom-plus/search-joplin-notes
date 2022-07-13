import { ActionPanel, List, Action } from "@raycast/api";
import { NoteDetail } from "./NoteDetail";
import type { data } from "../utils/types";

type Props = { data: data; path: string };

export const NotesList = ({ data, path }: Props) => (
  <List.Item
    icon="list-icon.png"
    title={data.title}
    actions={
      <ActionPanel>
        <Action.Push title={data.title} target={<NoteDetail content={data.body} path={path} />} />
      </ActionPanel>
    }
  />
);
