import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Spacer, StackDivider, VStack } from "@chakra-ui/react";
import TableSelector from "./TableSelector";
import TablePreview from "./TablePreview";
import { TableReference } from "./types";

export default function Sidebar() {
  const [tableRef, setTableRef] = useState<TableReference | null>(null);
  return (
    <VStack
      minWidth={270}
      as={"header"}
      padding={4}
      spacing={4}
      divider={<StackDivider borderColor="gray.200" />}
    >
      <TableSelector onSelect={setTableRef} />
      <TablePreview tableRef={tableRef} />
      {/* <Spacer /> */}
    </VStack>
  );
}
