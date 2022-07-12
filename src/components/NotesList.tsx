import { ActionPanel, List, Action, Detail } from "@raycast/api";
import type { data } from "../utils/types";

export const NotesList = (data: data, path: string) => {
  <List.Item
    icon="list-icon.png"
    title={data.title}
    key={data.id}
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
  />;
};
