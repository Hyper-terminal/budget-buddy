import React from "react";
import { Box } from "@chakra-ui/react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useExpense } from "../context/expense-context";

const Chart = () => {
  const { expenses } = useExpense();

  const chartTheme = {
    axis: {
      stroke: "#ffffff",
      tick: {
        fill: "#ffffff",
      },
    },
    tooltip: {
      backgroundColor: "#333333",
      color: "#ffffff",
    },
  };

  return (
    <Box
      bg="linear-gradient(45deg, #000022, #220044)"
      p={4}
      boxShadow="lg"
      borderRadius="lg"
      color="white"
      mt={10}
      position="relative"
      overflow="hidden"
    >
      {expenses?.length === 0 && (
        <Box textAlign="center" fontSize="lg" fontWeight="semibold">
          No expenses
        </Box>
      )}
      {expenses?.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={expenses}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <XAxis
              dataKey="date"
              stroke={chartTheme.axis.stroke}
              tick={{ fill: chartTheme.axis.tick.fill }}
            />
            <YAxis
              stroke={chartTheme.axis.stroke}
              tick={{ fill: chartTheme.axis.tick.fill }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: chartTheme.tooltip.backgroundColor,
                color: chartTheme.tooltip.color,
              }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#4deeea"
              strokeWidth={2}
              dot={{ stroke: "#4deeea", strokeWidth: 2, r: 4 }}
              activeDot={{ stroke: "#4deeea", strokeWidth: 3, r: 6 }}
              fill="rgba(77, 238, 234, 0.3)" // Area fill color
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default Chart;
