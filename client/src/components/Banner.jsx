import React from "react";
import {
  Box,
  Flex,
  Text,
  Stack,
  Progress,
  useBreakpointValue,
  Heading,
} from "@chakra-ui/react";
import { useExpense } from "../context/expense-context";

const Banner = () => {
  const totalIncome = 345670;
  const { expenses } = useExpense();
  const totalExpenses = expenses?.reduce(
    (acc, expense) => acc + Number(expense.amount),
    0
  );
  const balance = totalIncome - totalExpenses;
  
  const expensePercentage = (totalExpenses / totalIncome) * 100;

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      bg="linear-gradient(45deg, #000022, #220044)"
      p={4}
      boxShadow="lg"
      borderRadius="lg"
      color="white"
    >
      <Flex
        direction={isMobile ? "column" : "row"}
        justify="space-between"
        align={isMobile ? "flex-start" : "center"}
        wrap="wrap"
        gap={isMobile ? 4 : 8}
        fontWeight="semibold"
      >
        <Box>
          <Heading as="h3" fontSize="lg" color="whiteAlpha.800" mb={1}>
            Total Income
          </Heading>
          <Text fontSize="3xl" color="green.200">
            ${totalIncome}
          </Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="whiteAlpha.800" mb={1}>
            Total Expenses
          </Heading>
          <Text fontSize="3xl" color="red.200">
            ${totalExpenses}
          </Text>
        </Box>

        <Box>
          <Heading as="h3" fontSize="lg" color="whiteAlpha.800" mb={1}>
            Balance
          </Heading>
          <Text fontSize="3xl" color="blue.200">
            ${balance}
          </Text>
        </Box>

        <Box w="100%">
          <Heading as="h3" fontSize="lg" color="whiteAlpha.800" mb={2}>
            Expense Percentage
          </Heading>
          <Flex align="center">
            <Progress
              value={expensePercentage}
              colorScheme="teal"
              size="sm"
              borderRadius="md"
              flex="1"
            />
            <Text fontSize="lg" color="whiteAlpha.900" ml={2}>
              {expensePercentage.toFixed(2)}%
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Banner;
