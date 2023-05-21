import { Box, CloseButton, Flex, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { FiHome, FiLogOut, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useExpense } from "../../context/expense-context";
import NavItem from "./NavItem";

const SidebarContent = ({ onClose, ...rest }) => {
  const { signOut } = useContext(AuthContext);
  const { openExpenseModal } = useExpense();
  const navigate = useNavigate();

  const handleSignout = () => {
    signOut();
    navigate("/");
  };

  return (
    <Box
      bg="linear-gradient(45deg, #000022, #220044)"
      borderRight="2px"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: "linear-gradient(45deg, #000022, #220044)",

          zIndex: -1,
        }}
      >
        <Text
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          color="white"
        >
          Budget Buddy
        </Text>
        <CloseButton
          color="whiteAlpha.800"
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
        />
      </Flex>

      <NavItem
        display={{ base: "none", md: "flex" }}
        icon={FiPlus}
        onClick={() => openExpenseModal()}
      >
        Add Expense
      </NavItem>

      <NavItem icon={FiHome} onClick={() => navigate("/expenses")}>
        Home
      </NavItem>

      <NavItem icon={FiLogOut} onClick={handleSignout}>
        Sign Out
      </NavItem>
    </Box>
  );
};

export default SidebarContent;
