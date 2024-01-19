import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useExpense } from "../context/expense-context";
import CustomSelect from "./CustomSelect";

const formInitialState = {
  description: "",
  amount: "",
  category: "",
  name: "",
};

const ExpenseForm = () => {
  const [form, setForm] = useState(formInitialState);
  const [error, setError] = useState("");
  const { expenses, setExpenses, closeExpenseModal, setTotalExpenses } =
    useExpense();
  const { description, amount, category, name } = form;
  const toast = useToast();

  const handleCategorySelect = (selectedCategory) => {
    setError("");
    setForm((prev) => ({ ...prev, category: selectedCategory }));
  };

  const changeHandler = (event) => {
    setError("");
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!name || !amount || !category) {
      setError("Please enter all required fields");
      return;
    }

    closeExpenseModal();

    const expense = {
      description,
      amount,
      category,
      name,
    };
    // Send the expense to the server
    fetch("http://localhost:3000/expenses", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("JWT_TOKEN"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setForm(formInitialState);
          setTotalExpenses(Number(result.totalExpenses));
          setExpenses([...expenses, result.expense]);
          toast({
            title: "Expense Added",
            description: "Your expense has been successfully added.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          setError(result.message);
          toast({
            title: "Error",
            description: result.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <Box
      as="form"
      onSubmit={submitHandler}
      display="inline-flex"
      flexDirection="column"
      alignItems="flex-start"
      mt={4}
      bg="linear-gradient(45deg, #000022, #220044)"
      p={10}
      w={"50%"}
      mb={10}
    >
      <FormControl isRequired mb={4}>
        <FormLabel color="purple.200" fontSize="sm" mb={1}>
          Name
        </FormLabel>
        <Input
          name="name"
          outline={"none"}
          borderColor="purple.200"
          placeholder="Name"
          value={name}
          onChange={changeHandler}
          color="whiteAlpha.700"
          fontWeight="semibold"
        />
      </FormControl>

      <FormControl isRequired isInvalid={!!error} mb={4}>
        <FormLabel color="purple.200" fontSize="sm" mb={1}>
          Category
        </FormLabel>
        <CustomSelect
          value={category}
          onChange={handleCategorySelect}
          placeholder="Select category"
        />
      </FormControl>
      <FormControl
        isRequired
        isInvalid={!amount && error === "Please enter an amount"}
        mb={4}
      >
        <FormLabel color="purple.200" fontSize="sm" mb={1}>
          Amount
        </FormLabel>
        <Input
          type="number"
          outline={"none"}
          borderColor="purple.200"
          name="amount"
          placeholder="Amount"
          value={amount}
          onChange={changeHandler}
          color="whiteAlpha.700"
          fontWeight="semibold"
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel color="purple.200" fontSize="sm" mb={1}>
          Description
        </FormLabel>
        <Textarea
          name="description"
          placeholder="Description"
          outline={"none"}
          borderColor="purple.200"
          value={description}
          onChange={changeHandler}
          color="whiteAlpha.700"
          fontWeight="semibold"
        />
      </FormControl>
      {error && <FormErrorMessage color="red.500">{error}</FormErrorMessage>}
      <Stack direction={"row"}>
        <Button onClick={() => closeExpenseModal()}>Cancel </Button>
        <Button
          type="submit"
          colorScheme="purple"
          variant="solid"
          mt={4}
          alignSelf="flex-start"
        >
          Add Expense
        </Button>
      </Stack>
    </Box>
  );
};

export default ExpenseForm;
