import { ActionPanel, List, Action, Detail } from "@raycast/api";
import type { data } from "../utils/types";

type Props = { data: data; path: string };

export const NotesList = ({ data, path }: Props) => (
  <List.Item
    icon="list-icon.png"
    title={data.title}
    actions={
      <ActionPanel>
        <Action.Push
          title={data.title}
          target={
            <Detail
              markdown={data.body}
              actions={
                <ActionPanel>
                  <Action.Open title="Open Note" target={path} />
                </ActionPanel>
              }
            />
          }
        />
      </ActionPanel>
    }
  />
);
