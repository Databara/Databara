import { useState } from "react";
import Sidebar from "./Sidebar";
import Workspace from "./Workspace";
import { Flex } from "@chakra-ui/react";

function App() {
  return (
    <Flex direction={"row"} height="100%">
      <Sidebar />
      <Workspace />
    </Flex>
  );
}

export default App;
