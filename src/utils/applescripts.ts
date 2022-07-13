import { runAppleScriptSync } from "run-applescript";
import { JoplinBundleId } from "./constants";

export const openJoplin = () =>
  runAppleScriptSync(`
if application "Joplin" is not running then
  tell application "Joplin" to run
  delay 2.5
  tell application "System Events"
    set visible of process "Joplin" to false
  end tell
  do shell script "open -b ${JoplinBundleId}"
end if`);
