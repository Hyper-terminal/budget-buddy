import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const [errors, setErrors] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/users/forgot-password", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email: email }),
      });

      const data = await res.json();

      if (!data.success) new Error();

      toast({
        title: "Mail sent",
        description: "Please check your mail",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed to sent mail",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const inputHandler = (event) => {
    const { value } = event.target;
    setErrors(null);
    setEmail(value);
  };

  return (
    <Box
      style={{ minHeight: "100vh", minWidth: "100vw", background: "#212f45" }}
      py={10}
    >
      <Box
        maxW="md"
        mx="auto"
        p="6"
        borderRadius="lg"
        boxShadow="xl"
        bg="gray.900"
        color="white"
      >
        <Heading textAlign="center" mb="6" fontSize="3xl" fontWeight="bold">
          Budget Buddy
        </Heading>
        {errors && (
          <Text mt="4" color="red.500" fontWeight="semibold" textAlign="center">
            {errors[0].toUpperCase() + errors.slice(1)}
          </Text>
        )}

        <form onSubmit={submitHandler}>
          <VStack spacing="4" mt="8">
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="you@example.com"
                name="email"
                value={email}
                onChange={inputHandler}
                bg="gray.800"
                borderColor="gray.600"
                _hover={{ borderColor: "blue.400" }}
                _focus={{ borderColor: "blue.500" }}
                _placeholder={{ color: "gray.500" }}
                color="white"
                focusBorderColor="blue.500"
                size="lg"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              fontWeight="semibold"
              rounded="full"
              _hover={{ bg: "blue.600" }}
              _focus={{ boxShadow: "none" }}
            >
              Send Email
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};
