import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Chart from "../components/Chart";
import Expenses from "../components/Expenses";

const Home = () => {
  const ref = useRef();

  useEffect(() => {
    ref.current.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div ref={ref}>
      <Banner />
      <Chart />

      <Flex wrap="wrap" direction={["column", "row"]} mt={10} gap={4}>
        <Box flex={["100%", "70%"]} mb={[4, 0]}>
          <Expenses />
        </Box>
        <Box flex={["100%", "25%"]}>
          <Categories />
        </Box>
      </Flex>
    </div>
  );
};

export default Home;
