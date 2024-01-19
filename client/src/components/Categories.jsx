import React from "react";
import { Box, Flex, Heading, Text, Wrap, WrapItem, Icon } from "@chakra-ui/react";
import { RiRestaurantLine, RiBus2Line, RiHome2Line, RiMovieLine, RiHospitalLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Food", icon: RiRestaurantLine, color: "teal.500" },
    { name: "Transportation", icon: RiBus2Line, color: "cyan.500" },
    { name: "Housing", icon: RiHome2Line, color: "purple.500" },
    { name: "Entertainment", icon: RiMovieLine, color: "pink.500" },
    { name: "Healthcare", icon: RiHospitalLine, color: "orange.500" },
  ];

  const handleClickCategory = (category) => {
    navigate(`/expenses/all?category=${category}`);
  };

  return (
    <Box
      flexBasis={["100%", "30%"]}
      display="inline-block"
      borderRadius="lg"
      boxShadow="md"
      bg="linear-gradient(45deg, #000022, #220044)"
      p={4}
      color="white"
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h3" fontWeight="bold" fontSize="2xl">
          Categories
        </Heading>
        <Text
          fontSize="2xl"
          fontWeight="semibold"
          cursor="pointer"
          color="blue.200"
        >
          +
        </Text>
      </Flex>

      <Box borderTopWidth="1px" borderColor="whiteAlpha.200" mb={4} />

      <Wrap spacing={3} minHeight="100%">
        {categories.map((category) => (
          <WrapItem key={category.name} flex="1 0 100%">
            <Box
              p="6"
              borderRadius="lg"
              color="whiteAlpha.800"
              _hover={{
                bg: "linear-gradient(45deg, #28274d, #4b3f72)",
                color: "whiteAlpha.900",
              }}
              cursor="pointer"
              display="flex"
              alignItems="center"
              height="100%"
              w="100%"
              onClick={() => handleClickCategory(category.name)}
            >
              <Icon
                as={category.icon}
                boxSize={5}
                color={category.color}
                mr={2}
              />
              <Text fontSize="md" fontWeight="semibold">
                {category.name}
              </Text>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default Categories;
