import { Box, CloseButton, Flex, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import {
  FiCompass,
  FiHome,
  FiLogOut,
  FiSettings,
  FiStar,
  FiTrendingUp,
  FiPlus,
} from "react-icons/fi";
import { AuthContext } from "../../context/auth-context";
import NavItem from "./NavItem";
import { useExpense } from "../../context/expense-context";

const LinkItems = [
  { name: "Home", icon: FiHome },
  { name: "Trending", icon: FiTrendingUp },
  { name: "Explore", icon: FiCompass },
  { name: "Favourites", icon: FiStar },
  { name: "Settings", icon: FiSettings },
];

const SidebarContent = ({ onClose, ...rest }) => {
  const { signOut } = useContext(AuthContext);
  const { openExpenseModal } = useExpense();

  const handleSignout = () => {
    signOut();
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
          Logo
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

      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
      <NavItem icon={FiLogOut} onClick={handleSignout}>
        Sign Out
      </NavItem>
    </Box>
  );
};

export default SidebarContent;
