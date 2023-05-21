import React from "react";
import { Box, Flex, Heading, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { AiOutlineDollar } from "react-icons/ai";
import { useExpense } from "../context/expense-context";
import { useNavigate } from "react-router-dom";

const ExpensesPage = () => {
  const navigate = useNavigate();
  const { expenses } = useExpense();

  if (expenses.length === 0) {
    return (
      <Box
        width={"100%"}
        height={"100%"}
        display="inline-block"
        borderRadius="lg"
        color="whiteAlpha.800"
        boxShadow="md"
        p={4}
        bg="linear-gradient(45deg, #000022, #220044)"
      >
        <Flex justify="center" align="center" height="200px">
          <Text fontSize="lg" fontWeight="semibold" color="white">
            No expenses
          </Text>
        </Flex>
      </Box>
    );
  }

  return (
    <Box
      display="inline-block"
      width={"100%"}
      height={"100%"}
      borderRadius="lg"
      color="whiteAlpha.800"
      boxShadow="md"
      p={4}
      bg="linear-gradient(45deg, #000022, #220044)"
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h3" fontWeight="bold" fontSize="2xl" color="white">
          My Expenses
        </Heading>
      </Flex>

      <Box borderTopWidth="1px" borderColor="whiteAlpha.200" mb={4} />

      <Wrap spacing={2}>
        {expenses.map((expense) => (
          <WrapItem
            onClick={() => navigate(`/expenses/${expense.id}`)}
            key={expense.id}
            flex="1 0 100%"
          >
            <Box
              p={4}
              borderRadius="lg"
              color="whiteAlpha.800"
              _hover={{
                bg: "linear-gradient(45deg, #28274d, #4b3f72)",
                color: "whiteAlpha.900",
              }}
              cursor="pointer"
              display="flex"
              alignItems="center"
              width="100%"
            >
              <Flex align="center" flex="1">
                <Box as={AiOutlineDollar} boxSize={6} color="red.500" mr={2} />
                <Box>
                  <Text
                    color={"whiteAlpha.700"}
                    fontSize="md"
                    fontWeight="semibold"
                  >
                    {expense.name}
                  </Text>
                  <Text fontSize="sm" color="whiteAlpha.500">
                    {expense.date}
                  </Text>
                </Box>
              </Flex>
              {expense.description && (
                <Text fontSize="sm" color="whiteAlpha.500" ml={4}>
                  {expense.description.slice(0, 20)}
                </Text>
              )}
              <Text fontSize="md" fontWeight="semibold" ml={4}>
                ${expense.amount}
              </Text>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default ExpensesPage;