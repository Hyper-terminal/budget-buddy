import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useExpense } from "../context/expense-context";
import { FiEdit, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const ExpenseEditPage = () => {
  const navigate = useNavigate();
  const { expenseId } = useParams();
  const { expenses, setExpenses, setTotalExpenses } = useExpense();
  const toast = useToast();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const expense = expenses.find(
      (item) => Number(item.id) === Number(expenseId)
    );
    if (expense) {
      setDescription(expense.description);
      setName(expense.name);
      setAmount(expense.amount);
      setCategory(expense.category);
    }
  }, [expenseId, expenses]);
  const handleSave = async () => {
    const updatedExpense = {
      id: expenseId,
      name,
      category,
      amount,
      description,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/expenses/${expenseId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("JWT_TOKEN"),
          },
          body: JSON.stringify(updatedExpense),
        }
      );

      if (response.ok) {
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            Number(expense.id) === Number(expenseId) ? updatedExpense : expense
          )
        );
        const data = await response.json();
        setTotalExpenses(data.totalExpenses);
        toast({
          title: "Expense updated",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        navigate(`/expenses/${expenseId}`);
      } else {
        throw new Error("Failed to update expense");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      bgGradient="linear-gradient(45deg, #000022, #220044)"
      color="white"
      p={10}
    >
      <MotionBox
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        w="100%"
        maxW="400px"
      >
        <Heading size="2xl" mb={6} color="cyan.300" textAlign="center">
          <FiEdit size={24} style={{ marginRight: "8px" }} />
          Edit Expense
        </Heading>

        <Box p={6} bg="gray.900" rounded="lg" shadow="lg">
          <Text fontSize="lg" fontWeight="bold" mb={2} color="gray.400">
            Name
          </Text>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            mb={4}
            bg="gray.800"
            _placeholder={{ color: "gray.400" }}
          />

          <Text fontSize="lg" fontWeight="bold" mb={2} color="gray.400">
            Category
          </Text>
          <Input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
            mb={4}
            bg="gray.800"
            _placeholder={{ color: "gray.400" }}
          />

          <Text fontSize="lg" fontWeight="bold" mb={2} color="gray.400">
            Amount
          </Text>
          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            mb={4}
            bg="gray.800"
            _placeholder={{ color: "gray.400" }}
          />

          <Text fontSize="lg" fontWeight="bold" mb={2} color="gray.400">
            Description
          </Text>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            mb={4}
            bg="gray.800"
            _placeholder={{ color: "gray.400" }}
          />

          <Flex mt={8} justify="center">
            <MotionBox
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              as={Button}
              colorScheme="cyan"
              size="lg"
              onClick={handleSave}
              _hover={{ bg: "cyan.600" }}
              _active={{ bg: "cyan.700" }}
              mr={4}
            >
              Save
            </MotionBox>
            <MotionBox
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              as={Button}
              colorScheme="red"
              size="lg"
              onClick={handleCancel}
              _hover={{ bg: "red.600" }}
              _active={{ bg: "red.700" }}
            >
              <FiX size={18} style={{ marginRight: "4px" }} />
              Cancel
            </MotionBox>
          </Flex>
        </Box>
      </MotionBox>
    </Flex>
  );
};

export default ExpenseEditPage;
