import React from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import DiffCodeEditor from "../components/DiffCodeEditor";

const TAPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex direction={{ base: "column", md: "row" }} minH="100vh">
      <Sidebar isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      <Flex flex="1" p={4}>
        <DiffCodeEditor />
      </Flex>
    </Flex>
  );
};

export default TAPage;
