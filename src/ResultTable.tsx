import { Flex, Table, TableContainer, Tbody, Thead } from "@chakra-ui/react";

export default function ResultTable() {
  return (
    <Flex align={"stretch"} direction={"column"}>
      <TableContainer>
        <Table>
          <Thead></Thead>
          <Tbody></Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}
