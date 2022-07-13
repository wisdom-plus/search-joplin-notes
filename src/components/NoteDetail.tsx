import { Detail, Action, ActionPanel } from "@raycast/api";

type Props = { content: string; path: string };

export const NoteDetail = ({ content, path }: Props) => (
  <Detail
    markdown={content}
    actions={
      <ActionPanel>
        <Action.Open title="Open Note" target={path} />
      </ActionPanel>
    }
  />
);
