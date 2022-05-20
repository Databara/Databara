import { useState, useEffect } from "react";
import { Select, FormControl, FormLabel } from "@chakra-ui/react";
import { invoke } from "@tauri-apps/api/tauri";
import { TableReference } from "./types";

type ChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => void;

function ArraySelect({
  items,
  handleChange,
  itemType,
}: {
  items: string[] | null;
  itemType: "catalog" | "schema" | "table";
  handleChange: ChangeHandler;
}) {
  let content = <Select isDisabled={true} placeholder={"N/A"}></Select>;
  if (Array.isArray(items)) {
    const empty = items.length === 0;
    const placeholder = empty
      ? `No ${itemType}s found`
      : `Select ${itemType}...`;
    content = (
      <Select
        placeholder={placeholder}
        onChange={handleChange}
        isDisabled={empty}
      >
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>
    );
  }
  return content;
}

function CatalogSelect({ handleChange }: { handleChange: ChangeHandler }) {
  const [catalogs, setCatalogs] = useState<string[] | null>(null);
  async function loadCatalogs() {
    const catalogs: string[] = await invoke("catalogs");
    setCatalogs(catalogs);
  }
  async function seedTable() {
    await invoke("seed_table");
  }
  useEffect(() => {
    loadCatalogs();
    seedTable();
  }, []);
  return (
    <ArraySelect
      items={catalogs}
      itemType={"catalog"}
      handleChange={handleChange}
    />
  );
}

function SchemaSelect({
  catalog,
  handleChange,
}: {
  catalog: string;
  handleChange: ChangeHandler;
}) {
  const [schemas, setSchemas] = useState<string[] | null>(null);
  async function loadSchemas(catalog: string) {
    const schemas: string[] = await invoke("schemas", { catalog });
    setSchemas(schemas);
  }
  useEffect(() => {
    if (catalog !== "") {
      loadSchemas(catalog);
    } else {
      setSchemas(null);
    }
  }, [catalog]);
  return (
    <ArraySelect
      items={schemas}
      itemType={"schema"}
      handleChange={handleChange}
    />
  );
}

function TableSelect({
  catalog,
  schema,
  handleChange,
}: {
  catalog: string;
  schema: string;
  handleChange: ChangeHandler;
}) {
  const [tables, setTables] = useState<string[] | null>(null);
  async function loadTables(catalog: string, schema: string) {
    const tables: string[] = await invoke("tables", { catalog, schema });
    setTables(tables);
  }
  useEffect(() => {
    if (catalog !== "" && schema !== "") {
      loadTables(catalog, schema);
    } else {
      setTables(null);
    }
  }, [catalog, schema]);
  return (
    <ArraySelect
      items={tables}
      itemType={"table"}
      handleChange={handleChange}
    />
  );
}

export default function TableSelector({
  onSelect,
}: {
  onSelect: (selected: TableReference | null) => void;
}) {
  const [catalog, setCatalog] = useState<string>("");
  const [schema, setSchema] = useState<string>("");
  const [table, setTable] = useState<string>("");
  useEffect(() => {
    if (catalog !== "" && schema !== "" && table !== "") {
      onSelect({ catalog, schema, table });
    } else {
      onSelect(null);
    }
  }, [catalog, schema, table]);
  return (
    <>
      <FormControl>
        <FormLabel htmlFor="catalog">Catalog</FormLabel>
        <CatalogSelect
          handleChange={(e) => {
            setCatalog(e.target.value);
            setSchema("");
            setTable("");
          }}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="schema">Schema</FormLabel>
        <SchemaSelect
          catalog={catalog}
          handleChange={(e) => {
            setSchema(e.target.value);
            setTable("");
          }}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="table">Table</FormLabel>
        <TableSelect
          catalog={catalog}
          schema={schema}
          handleChange={(e) => setTable(e.target.value)}
        />
      </FormControl>
    </>
  );
}
