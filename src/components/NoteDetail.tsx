import { Detail, Action, ActionPanel } from "@raycast/api";
import { useGetPath } from "../utils/hooks";

export const NoteDetail = ({ content }: { content: string }) => {
  const path = useGetPath();

  return (
    <Detail
      markdown={content}
      actions={
        <ActionPanel>
          <Action.Open title="Open Note" target={path} />
        </ActionPanel>
      }
    />
  );
};
