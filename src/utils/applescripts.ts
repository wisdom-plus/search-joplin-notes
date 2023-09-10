import { runAppleScript } from "@raycast/utils";
import { JoplinBundleId } from "./constants";

export const openJoplin = async () =>
  await runAppleScript(`
if application "Joplin" is not running then
  tell application "Joplin" to run
  delay 0.5
  tell application "System Events"
    set visible of process "Joplin" to false
  end tell
  do shell script "open -b ${JoplinBundleId}"
end if`);
