import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Chart from "../components/Chart";
import Expenses from "../components/Expenses";
import ExpenseForm from "../components/ExpenseForm";

const Home = () => {
  return (
    <>
      <Banner />
      <Chart expenses={[]} />

      <Flex wrap="wrap" direction={["column", "row"]} mt={10} gap={4}>
        <Box flex={["100%", "70%"]} mb={[4, 0]}>
          <Expenses />
        </Box>
        <Box flex={["100%", "25%"]}>
          <Categories />
        </Box>
      </Flex>
    </>
  );
};

export default Home;
