import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Wrap,
  WrapItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { AiOutlineDollar } from "react-icons/ai";
import { useExpense } from "../context/expense-context";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutGroup, motion } from "framer-motion";

const ExpensesPage = () => {
  const navigate = useNavigate();
  const { expenses } = useExpense();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  const [sortOption, setSortOption] = useState("");

  // Filter expenses based on the category
  const filteredExpenses = category
    ? expenses.filter(
        (expense) =>
          expense.category.toLowerCase().trim() ===
          category.trim().toLowerCase()
      )
    : expenses;

  // Sort expenses based on the selected option
  const sortedExpenses = sortOption
    ? [...filteredExpenses].sort((a, b) => {
        if (sortOption === "name") {
          return a.name.localeCompare(b.name);
        } else if (sortOption === "date") {
          return new Date(b.date) - new Date(a.date);
        } else if (sortOption === "amount") {
          return b.amount - a.amount;
        }
      })
    : filteredExpenses;

  const handleSortOption = (option) => {
    setSortOption(option);
  };

  if (sortedExpenses.length === 0) {
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
        <Menu>
          <MenuButton as={Button} variant="outline" colorScheme="whiteAlpha">
            Sort by
          </MenuButton>
          <MenuList bg="linear-gradient(45deg, #000022, #220044)">
            <MenuItem
              bg="linear-gradient(45deg, #000022, #220044)"
              _hover={{ bg: "linear-gradient(45deg, #28274d, #4b3f72)" }}
              onClick={() => handleSortOption("name")}
            >
              Name
            </MenuItem>
            <MenuItem
              _hover={{ bg: "linear-gradient(45deg, #28274d, #4b3f72)" }}
              bg="linear-gradient(45deg, #000022, #220044)"
              onClick={() => handleSortOption("date")}
            >
              Date
            </MenuItem>
            <MenuItem
              bg="linear-gradient(45deg, #000022, #220044)"
              _hover={{ bg: "linear-gradient(45deg, #28274d, #4b3f72)" }}
              onClick={() => handleSortOption("amount")}
            >
              Amount
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Box borderTopWidth="1px" borderColor="whiteAlpha.200" mb={4} />

      <LayoutGroup>
        <Wrap spacing={2}>
          {sortedExpenses.map((expense) => (
            <WrapItem
              onClick={() => navigate(`/expenses/${expense.id}`)}
              key={expense.id}
              flex="1 0 100%"
            >
              <motion.div style={{ width: "100%" }} layout>
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
                    <Box
                      as={AiOutlineDollar}
                      boxSize={6}
                      color="red.500"
                      mr={2}
                    />
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
              </motion.div>
            </WrapItem>
          ))}
        </Wrap>
      </LayoutGroup>
    </Box>
  );
};

export default ExpensesPage;
