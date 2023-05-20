import { Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { FiMenu, FiPlus } from "react-icons/fi";
import NavItem from "./NavItem";
import { useExpense } from "../../context/expense-context";

const MobileNav = ({ onOpen, ...rest }) => {
  const { openExpenseModal } = useExpense();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg="linear-gradient(45deg, #000022, #220044)"
      boxShadow={"xl"}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
        color="white"
        border="none"
        _hover={{ color: "gray.400" }}
      />

      <Text
        fontSize="2xl"
        ml="8"
        fontFamily="monospace"
        fontWeight="bold"
        color="white"
      >
        Logo
      </Text>
      <NavItem onClick={() => openExpenseModal()} icon={FiPlus}>
        Add Expense
      </NavItem>
    </Flex>
  );
};

export default MobileNav;
