import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import EditorTabs from "./EditorTabs";
import ResultTable from "./ResultTable";

export default function Workspace() {
  return (
    <Flex as={"main"} margin={4} align={"stretch"} direction={"column"} gap={2}>
      <EditorTabs />
      <ResultTable />
    </Flex>
  );
}
