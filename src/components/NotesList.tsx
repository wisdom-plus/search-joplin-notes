import { ActionPanel, List, Action, Icon, Color } from "@raycast/api";
import { NoteDetail } from "./NoteDetail";
import type { data } from "../utils/types";

type Props = { data: data; path: string };

export const NotesList = ({ data, path }: Props) => (
  <List.Item
    icon={{ source: Icon.List, tintColor: Color.Blue }}
    title={data.title}
    actions={
      <ActionPanel>
        <Action.Push title={data.title} target={<NoteDetail content={data.body} path={path} />} />
      </ActionPanel>
    }
  />
);
