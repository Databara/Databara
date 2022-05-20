import { Flex, Table, Tbody, Text, Tr } from "@chakra-ui/react";
import { TableReference } from "./types";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";

export default function TablePreview({
  tableRef,
}: {
  tableRef: TableReference | null;
}) {
  const [records, setRecords] = useState<Record<string, any>[] | null>(null);
  async function previewTable(catalog: string, schema: string, table: string) {
    const data: Record<string, any>[] = await invoke("preview_table", {
      catalog,
      schema,
      table,
    });
    setRecords(data);
  }
  useEffect(() => {
    if (tableRef) {
      previewTable(tableRef.catalog, tableRef.schema, tableRef.table);
    }
  }, [tableRef]);

  if (tableRef == null) {
    return <Text>Select a table from above</Text>;
  }
  if (records == null) {
    return null;
  }

  return (
    <Table variant="simple">
      <Tbody>
        {records.map((record) => {
          return <Tr>{`${record.column1}`}</Tr>;
        })}
      </Tbody>
    </Table>
  );
}
