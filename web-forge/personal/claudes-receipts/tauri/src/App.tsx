import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import StatusPopup from "./components/StatusPopup";
import SettingsWindow from "./components/SettingsWindow";

export default function App() {
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    const w = getCurrentWindow();
    setLabel(w.label);
  }, []);

  if (label === "status") return <StatusPopup />;
  if (label === "settings") return <SettingsWindow />;
  return null;
}
