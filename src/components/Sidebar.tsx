import React from "react";
import {
  Box,
  Flex,
  Icon,
  Link,
  Text,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from "react-icons/fi";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onOpen }) => {
  return (
    <>
      <Box
        display={{ base: "none", md: "block" }}
        bg="gray.800"
        color="white"
        w={{ base: "100%", md: "15vw" }}
        h="100vh"
        position="relative"
        top="0"
        left="0"
        p={4}
      >
        <Flex direction="column" align="flex-start">
          <Link href="/" mb="10px" display="flex" alignItems="center">
            <Icon as={FiHome} mr="4" />
            <Text>Home</Text>
          </Link>
          <Link href="/" mb="10px" display="flex" alignItems="center">
            <Icon as={FiTrendingUp} mr="4" />
            <Text>Trending</Text>
          </Link>
          <Link href="/" mb="10px" display="flex" alignItems="center">
            <Icon as={FiCompass} mr="4" />
            <Text>Explore</Text>
          </Link>
          <Link href="/" mb="10px" display="flex" alignItems="center">
            <Icon as={FiStar} mr="4" />
            <Text>Favorites</Text>
          </Link>
          <Link href="/" mb="10px" display="flex" alignItems="center">
            <Icon as={FiSettings} mr="4" />
            <Text>Settings</Text>
          </Link>
        </Flex>
      </Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <Flex direction="column" align="flex-start" padding="10px">
                <Link href="/" mb="10px" display="flex" alignItems="center">
                  <Icon as={FiHome} mr="4" />
                  <Text>Home</Text>
                </Link>
                <Link href="/" mb="10px" display="flex" alignItems="center">
                  <Icon as={FiTrendingUp} mr="4" />
                  <Text>Trending</Text>
                </Link>
                <Link href="/" mb="10px" display="flex" alignItems="center">
                  <Icon as={FiCompass} mr="4" />
                  <Text>Explore</Text>
                </Link>
                <Link href="/" mb="10px" display="flex" alignItems="center">
                  <Icon as={FiStar} mr="4" />
                  <Text>Favorites</Text>
                </Link>
                <Link href="/" mb="10px" display="flex" alignItems="center">
                  <Icon as={FiSettings} mr="4" />
                  <Text>Settings</Text>
                </Link>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default Sidebar;
