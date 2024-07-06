// src/components/Sidebar.tsx
import React from "react";
import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from "react-icons/fi";

const Sidebar = () => {
  return (
    <Box
      bg="gray.800"
      color="white"
      w="250px"
      h="100vh"
      position="fixed"
      top="0"
      left="0"
      paddingTop="20px"
    >
      <Flex direction="column" align="flex-start" padding="10px">
        <Link href="/" mb="10px" display="flex" alignItems="center">
          <Icon as={FiHome} mr="4" />
          <Text>Home</Text>
        </Link>
        <Link href="/trending" mb="10px" display="flex" alignItems="center">
          <Icon as={FiTrendingUp} mr="4" />
          <Text>Trending</Text>
        </Link>
        <Link href="/explore" mb="10px" display="flex" alignItems="center">
          <Icon as={FiCompass} mr="4" />
          <Text>Explore</Text>
        </Link>
        <Link href="/favorites" mb="10px" display="flex" alignItems="center">
          <Icon as={FiStar} mr="4" />
          <Text>Favorites</Text>
        </Link>
        <Link href="/settings" mb="10px" display="flex" alignItems="center">
          <Icon as={FiSettings} mr="4" />
          <Text>Settings</Text>
        </Link>
      </Flex>
    </Box>
  );
};

export default Sidebar;
