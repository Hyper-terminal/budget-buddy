import React from "react";
import { Box, Flex, Heading, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { AiOutlineDollar } from "react-icons/ai";
import { useExpense } from "../context/expense-context";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  const navigate = useNavigate();
  const { expenses } = useExpense();

  const data = expenses.map((expense) => ({
    name: expense.name,
    value: expense.amount,
  }));

  if (data.length === 0) {
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
      mt={10}
    >
      <Box width="100%" height={300} mt={6}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
            <XAxis dataKey="name" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip
              contentStyle={{
                borderRadius: "md",
                backgroundColor: "#220044",
                boxShadow: "md",
                color: "white",
                fontSize: "sm",
                padding: "0.5rem",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ fill: "#8884d8" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default Chart;
