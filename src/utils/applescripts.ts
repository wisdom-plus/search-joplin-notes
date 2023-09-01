import { runAppleScript } from "@raycast/utils";
import { RaycastBundleId } from "./constants";

export const openJoplin = async () =>
  await runAppleScript(`
if application "Joplin" is not running then
  tell application "Joplin" to run
  delay 2.5
  tell application "System Events"
    set visible of process "Joplin" to false
  end tell
  do shell script "open -b ${RaycastBundleId}"
end if`);
