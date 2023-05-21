import {
  Box,
  Button,
  Link as ChakraLink,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const API_URL = "http://localhost:3000/users/signup";
const INITIAL_FORM = { username: "", email: "", password: "" };

const Signup = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const { signIn } = useContext(AuthContext);

  const inputHandler = (event) => {
    setErrors(null);
    setForm((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      else {
        setForm(INITIAL_FORM);
        signIn(data);
        navigate("/");
      }
    } catch (error) {
      setErrors(error.message);
    }
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
        bgGradient="linear(to-b, #041d2e, #0a0e1e)"
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
            <FormControl id="username" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Pick your name"
                name="username"
                value={form.username}
                onChange={inputHandler}
                bg="gray.800"
                borderColor="gray.700"
                _hover={{ borderColor: "blue.400" }}
                _focus={{ borderColor: "blue.500" }}
                _placeholder={{ color: "gray.500" }}
                color="white"
                focusBorderColor="blue.500"
                size="lg"
              />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="you@example.com"
                name="email"
                value={form.email}
                onChange={inputHandler}
                bg="gray.800"
                borderColor="gray.700"
                _hover={{ borderColor: "blue.400" }}
                _focus={{ borderColor: "blue.500" }}
                _placeholder={{ color: "gray.500" }}
                color="white"
                focusBorderColor="blue.500"
                size="lg"
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Create a password"
                name="password"
                value={form.password}
                onChange={inputHandler}
                bg="gray.800"
                borderColor="gray.700"
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
              Sign up
            </Button>

            <ChakraLink
              as={Link}
              to="/signin"
              color="gray.300"
              fontWeight="semibold"
              _hover={{ color: "white" }}
            >
              Already have an account? Sign in
            </ChakraLink>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
