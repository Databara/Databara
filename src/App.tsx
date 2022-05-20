import { useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Workspace from "./Workspace";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Sidebar />
      <Workspace />
    </div>
  );
}

export default App;
