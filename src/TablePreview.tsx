import {
  Flex,
  ButtonGroup,
  Code,
  TableContainer,
  Table,
  Tbody,
  Text,
  Tr,
  Td,
  Thead,
  Th,
  Spacer,
  IconButton,
  Tag,
  Tooltip,
} from "@chakra-ui/react";
import { SmallCloseIcon, SearchIcon } from "@chakra-ui/icons";
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

function TablePreviewHeader({ tableRef }: { tableRef: TableReference }) {
  return (
    <Flex
      minWidth="max-content"
      alignItems="center"
      direction={"row"}
      marginTop={4}
      marginBottom={4}
    >
      <Tooltip label="catalog.schema.table">
        <Tag>
          {tableRef.catalog}.{tableRef.schema}.{tableRef.table}
        </Tag>
      </Tooltip>
      <Spacer />
      <ButtonGroup variant="ghost" size={"xs"} spacing="1">
        <Tooltip label="Preview table">
          <IconButton
            colorScheme="blue"
            aria-label="Preview table"
            icon={<SearchIcon />}
          />
        </Tooltip>
        <Tooltip label="Close schema preview">
          <IconButton
            aria-label="Close schema preview"
            icon={<SmallCloseIcon />}
          />
        </Tooltip>
      </ButtonGroup>
    </Flex>
  );
}

function TablePreviewRow({ record }: { record: InfoSchema }) {
  return (
    <Tr>
      <Td isNumeric>{record.ordinal_position}</Td>
      <Td>{record.column_name}</Td>
      <Td>{record.data_type}</Td>
      <Td>{record.is_nullable}</Td>
    </Tr>
  );
}

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
    } else {
      setRecords(null);
    }
  }, [tableRef]);

  if (tableRef == null) {
    return <Text>Select a table from above</Text>;
  }
  if (records == null) {
    return null;
  }
  return (
    <Flex direction={"column"}>
      <TablePreviewHeader tableRef={tableRef} />
      <TableContainer overflow={"scroll"}>
        <Table variant="striped" size="sm" colorScheme={"blackAlpha"}>
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
                <TablePreviewRow record={record} />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}
