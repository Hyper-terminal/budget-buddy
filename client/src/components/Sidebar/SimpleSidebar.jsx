import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import MobileNav from "./MobileNav";
import SidebarContent from "./SidebarContent";

export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  

  return (
    <Box zIndex={0} minH="100vh" bg="#212F45">
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="sm"
        // bg="linear-gradient(45deg, #0a192f, #143d59)"
        bg="#151a30"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* MobileNav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </Box>
  );
}
