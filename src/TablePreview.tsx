import {
  TableCaption,
  TableContainer,
  Table,
  Tbody,
  Text,
  Tr,
  Td,
  Thead,
  Th,
} from "@chakra-ui/react";
import { TableReference } from "./types";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";

type InfoSchema = {
  character_octet_length: number;
  column_name: string;
  data_type: string;
  is_nullable: string;
  ordinal_position: number;
  table_catalog: string;
  table_name: string;
  table_schema: string;
};

export default function TablePreview({
  tableRef,
}: {
  tableRef: TableReference | null;
}) {
  const [records, setRecords] = useState<InfoSchema[] | null>(null);
  async function previewTable(catalog: string, schema: string, table: string) {
    const data: InfoSchema[] = await invoke("preview_schema", {
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
    <TableContainer overflow={"scroll"}>
      <Table variant="striped" size="sm" colorScheme={"blackAlpha"}>
        <TableCaption placement="top">
          {tableRef.catalog}.{tableRef.schema}.{tableRef.table}
        </TableCaption>
        <Thead>
          <Tr>
            <Th isNumeric>#</Th>
            <Th>Name</Th>
            <Th>Data Type</Th>
            <Th>Nullable</Th>
          </Tr>
        </Thead>
        <Tbody>
          {records
            .sort((a, b) => a.ordinal_position - b.ordinal_position)
            .map((record) => (
              <Tr>
                <Td isNumeric>{record.ordinal_position}</Td>
                <Td>{record.column_name}</Td>
                <Td>{record.data_type}</Td>
                <Td>{record.is_nullable}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
