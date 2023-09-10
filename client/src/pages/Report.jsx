import { Box, Wrap, WrapItem, Text, Flex } from "@chakra-ui/react";
import { LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import { useExpense } from "../context/expense-context";

export default function Report() {
  const [filter, setFilter] = useState("daily");
  const { expenses } = useExpense();

  // Filter and process expenses data based on the selected filter (daily, weekly, monthly).
  const processData = () => {
    let filteredData;
    const today = new Date().setHours(0, 0, 0, 0);
    if (filter === "daily") {
      filteredData = expenses.filter(
        (item) => new Date(item.createdAt).setHours(0, 0, 0, 0) === today
      );
    } else if (filter === "weekly") {
      // Filter data for the past week
      // You'll need to implement the logic to filter data for the past week.
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      lastWeek.setHours(0, 0, 0, 0);
      filteredData = expenses.filter(
        (item) =>
          new Date(item.createdAt).setHours(0, 0, 0, 0) >= lastWeek &&
          new Date(item.createdAt).setHours(0, 0, 0, 0) <= today
      );
    } else if (filter === "monthly") {
      // Filter data for the past month
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      lastMonth.setHours(0, 0, 0, 0);

      filteredData = expenses.filter(
        (item) =>
          new Date(item.createdAt).setHours(0, 0, 0, 0) >= lastMonth &&
          new Date(item.createdAt).setHours(0, 0, 0, 0) <= today
      );
    }
    return filteredData;
  };

  const data = processData();

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
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        width="fit-content"
        mb={4}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      {/* Here, you can render the filtered data in a table or chart */}
      {/* You can map through filteredData and display each expense */}
      {/* Example: */}
      {data.map((expense) => (
        <div key={expense.id}>
          <p>Amount: {expense.amount}</p>
          <p>Category: {expense.category}</p>
          {/* Add more expense details here */}
        </div>
      ))}
    </Box>
  );
}
