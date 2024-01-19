import * as React from "react";
import {
  Container,
  Box,
  chakra,
  Flex,
  Divider,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";

export const Leaderboard = ({ data }) => {
  return (
    <Container maxW="3xl" py={10} px={4}>
      <Box
        border="1px solid"
        borderColor="gray.400"
        rounded="md"
        boxShadow="lg"
        overflow="hidden"
        color='whiteAlpha.800'
      >
        <Flex justify="left" p={5}>
          <chakra.h3 fontSize="xl" fontWeight="bold" textAlign="center">
            Leaderboard
          </chakra.h3>
        </Flex>
        <Divider />
        <TableContainer>
          <Table size="md">
            <Thead>
              <Tr fontWeight="900">
                <Th color='whiteAlpha.700'>User</Th>
                <Th color='whiteAlpha.700'>Total Expense</Th>
                <Th color='whiteAlpha.700'>Total Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, index) => (
                <Tr key={item.id}>
                  <Td fontSize="sm">{item.username}</Td>
                  <Td>
                    <Box
                      w="100%"
                      bg={useColorModeValue("gray.300", "gray.600")}
                      rounded="md"
                    >
                      <Box
                        w={item.total_amount}
                        h={2}
                        bg="blue.400"
                        rounded="md"
                      ></Box>
                    </Box>
                  </Td>
                  <Td fontSize="sm">Rs. {item.total_amount}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};
