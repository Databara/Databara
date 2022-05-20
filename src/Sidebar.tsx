import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import {
  FormControl,
  Spacer,
  FormLabel,
  StackDivider,
  VStack,
  Select,
} from "@chakra-ui/react";

function CatalogSelect({
  setCatalog,
}: {
  setCatalog: (catalog: string) => void;
}) {
  const [catalogs, setCatalogs] = useState<string[] | null>(null);
  async function loadCatalogs() {
    const catalogs: string[] = await invoke("catalogs");
    setCatalogs(catalogs);
  }
  useEffect(() => {
    loadCatalogs();
  });
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCatalog(event.target.value);
  };
  let content = (
    <Select isDisabled={true} placeholder="Loading Catalogs..."></Select>
  );
  if (Array.isArray(catalogs)) {
    const empty = catalogs.length === 0;
    const placeholder = empty ? "No catalogs found" : "Select Catalog...";
    content = (
      <Select
        placeholder={placeholder}
        onChange={handleChange}
        isDisabled={empty}
      >
        {catalogs.map((catalog) => (
          <option key={catalog} value={catalog}>
            {catalog}
          </option>
        ))}
      </Select>
    );
  }
  return content;
}

function SchemaSelect({
  catalog,
  setSchema,
}: {
  catalog: string;
  setSchema: (schema: string) => void;
}) {
  const [schemas, setSchemas] = useState<string[] | null>(null);
  async function loadSchemas(catalog: string) {
    const schemas: string[] = await invoke("schemas", { catalog });
    setSchemas(schemas);
  }
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSchema(event.target.value);
  };
  const disabled = catalog === "";
  useEffect(() => {
    if (catalog !== "") {
      loadSchemas(catalog);
    } else {
      setSchemas(null);
    }
  }, [catalog]);
  let content = (
    <Select
      isDisabled={disabled}
      placeholder={disabled ? "N/A" : "Loading Schemas..."}
    ></Select>
  );
  if (Array.isArray(schemas)) {
    const empty = schemas.length === 0;
    const placeholder = empty ? "No schemas found" : "Select Schema...";
    content = (
      <Select
        placeholder={placeholder}
        onChange={handleChange}
        isDisabled={schemas.length === 0}
      >
        {schemas.map((schema) => (
          <option key={schema} value={schema}>
            {schema}
          </option>
        ))}
      </Select>
    );
  }
  return content;
}

function TableSelect({
  catalog,
  schema,
  setTable,
}: {
  catalog: string;
  schema: string;
  setTable: (table: string) => void;
}) {
  const [tables, setTables] = useState<string[] | null>(null);
  async function loadTables(catalog: string, schema: string) {
    const tables: string[] = await invoke("tables", { catalog, schema });
    setTables(tables);
  }
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTable(event.target.value);
  };
  const disabled = catalog.length === 0 || schema.length === 0;
  useEffect(() => {
    if (catalog !== "" && schema !== "") {
      loadTables(catalog, schema);
    } else {
      setTables(null);
    }
  }, [catalog, schema]);
  let content = (
    <Select
      isDisabled={disabled}
      placeholder={disabled ? "N/A" : "Loading Tables..."}
    ></Select>
  );
  if (Array.isArray(tables)) {
    const empty = tables.length === 0;
    const placeholder = empty ? "No tables found" : "Select Table...";
    content = (
      <Select
        placeholder={placeholder}
        onChange={handleChange}
        isDisabled={empty}
      >
        {tables.map((table) => (
          <option key={table} value={table}>
            {table}
          </option>
        ))}
      </Select>
    );
  }
  return content;
}

export default function Sidebar() {
  const [catalog, setCatalog] = useState<string>("");
  const [schema, setSchema] = useState<string>("");
  const [table, setTable] = useState<string>("");
  return (
    <VStack
      minWidth={270}
      as={"header"}
      padding={4}
      spacing={4}
      divider={<StackDivider borderColor="gray.200" />}
    >
      <FormControl>
        <FormLabel htmlFor="catalog">Catalog</FormLabel>
        <CatalogSelect setCatalog={setCatalog} />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="schema">Schema</FormLabel>
        <SchemaSelect catalog={catalog} setSchema={setSchema} />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="table">Table</FormLabel>
        <TableSelect catalog={catalog} schema={schema} setTable={setTable} />
      </FormControl>

      <Spacer />
    </VStack>
  );
}
