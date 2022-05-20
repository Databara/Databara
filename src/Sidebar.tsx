import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./Sidebar.css";

export default function Sidebar() {
  const [catalogs, setCatalogs] = useState<string[] | null>(null);
  async function loadCatalogs() {
    const catalogs: string[] = await invoke("catalogs");
    setCatalogs(catalogs);
  }
  useEffect(() => {
    loadCatalogs();
  });
  let content = <span>Empty</span>;
  if (catalogs !== null) {
    content = (
      <ul>
        {catalogs.map((catalog) => {
          return <li>{catalog}</li>;
        })}
      </ul>
    );
  }
  return <header className="sidebar">{content}</header>;
}
