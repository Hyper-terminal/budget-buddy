import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <div to="#" textDecoration="none" _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "linear-gradient(45deg, #28274d, #4b3f72)",
          color: "white",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)", // Add a cool shadow effect
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="2"
            fontSize="16"
            color="teal.500"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        <Text fontSize="md" fontWeight="semibold" color="white">
          {children}
        </Text>
      </Flex>
    </div>
  );
};

export default NavItem;
