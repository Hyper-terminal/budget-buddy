import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const categories = [
  { name: "Food", color: "teal.500" },
  { name: "Transportation", color: "cyan.500" },
  { name: "Housing", color: "purple.500" },
  { name: "Entertainment", color: "pink.500" },
  { name: "Healthcare", color: "orange.500" },
];
const CustomSelect = ({ value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<FiChevronDown />}
        variant="outline"
        outline={"none"}
        borderColor="purple.200"
        _hover={{ borderColor: "gray.500" }}
        _expanded={{ borderColor: "gray.500", bg: "black" }}
        _focus={{
          outline: "none",
          borderColor: "gray.500",
          color: isOpen ? "white" : "whiteAlpha.600",
          bg: "black",
        }}
        color={isOpen ? "white" : "whiteAlpha.600"}
        w={"100%"}
        bg={isOpen ? "black" : "linear-gradient(45deg, #000022, #220044)"}
      >
        {value || placeholder}
      </MenuButton>
      <MenuList
        bg={isOpen ? "black" : "linear-gradient(45deg, #000022, #220044)"}
      >
        {categories.map((category) => (
          <MenuItem
            key={category.name}
            onClick={() => handleSelect(category.name)}
            _hover={{ bg: category.color, color: "white" }}
            bg="linear-gradient(45deg, #000022, #220044)"
            color="white"
          >
            {category.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default CustomSelect;
