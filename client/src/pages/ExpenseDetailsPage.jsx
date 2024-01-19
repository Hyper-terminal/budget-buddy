import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useExpense } from "../context/expense-context";

const ExpenseDetailsPage = () => {
  const navigate = useNavigate();
  const { expenseId } = useParams();
  const { expenses, deleteExpense } = useExpense();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const expense = expenses.find(
    (item) => Number(item.id) === Number(expenseId),
  );

  const handleDelete = () => {
    deleteExpense(expenseId, () => navigate("/"));
  };

  const handleEdit = () => {
    navigate("/expenses/" + expenseId + "/edit");
  };

  if (!expense) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgGradient="linear-gradient(45deg, #000022, #220044)"
        color="white"
        p={10}
      >
        <Box p={6} bg="gray.900" borderRadius="md" boxShadow="lg">
          <Text fontSize="lg" color="gray.400" textAlign="center">
            Expense not found.
          </Text>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgGradient="linear-gradient(45deg, #000022, #220044)"
      color="white"
      p={10}
    >
      <Box width="100%" maxWidth="700px">
        <Heading size="2xl" mb={6} color="cyan.300" textAlign="center">
          Expense Details
        </Heading>
        <Divider mb={6} borderColor="cyan.200" />

        <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.400">
          Name
        </Text>
        <Text fontSize="lg" fontWeight="semibold" color="gray.200" mb={6}>
          {expense.name}
        </Text>
        <Divider mb={6} borderColor="gray.400" />

        <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.400">
          Category
        </Text>
        <Text fontWeight="semibold" color="gray.200" fontSize="lg" mb={6}>
          {expense.category}
        </Text>
        <Divider mb={6} borderColor="gray.400" />

        <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.400">
          Amount
        </Text>
        <Text fontSize="lg" fontWeight="semibold" color="gray.200" mb={6}>
          ${expense.amount}
        </Text>
        <Divider mb={6} borderColor="gray.400" />

        <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.400">
          Description
        </Text>
        <Text fontSize="lg" mb={4} color="gray.200">
          {expense.description}
        </Text>

        <Flex mt={12} justifyContent="center">
          <Button
            colorScheme="red"
            size="lg"
            mr={6}
            onClick={handleDelete}
            leftIcon={<Icon as={FaTrashAlt} />}
            _hover={{ bg: "red.600" }}
            _active={{ bg: "red.700" }}
          >
            Delete
          </Button>
          <Button
            colorScheme="cyan"
            size="lg"
            onClick={handleEdit}
            leftIcon={<Icon as={FaEdit} />}
            _hover={{ bg: "cyan.600" }}
            _active={{ bg: "cyan.700" }}
          >
            Edit
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ExpenseDetailsPage;
