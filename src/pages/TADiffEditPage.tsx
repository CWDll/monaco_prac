import React from "react";
import DiffCodeEditor from "../components/DiffCodeEditor";
import Sidebar from "../components/Sidebar";
import { Box, Flex } from "@chakra-ui/react";

const TAPage = () => {
  return (
    <Flex direction="row" padding={0}>
      <Sidebar />
      <DiffCodeEditor />
    </Flex>
  );
};

export default TAPage;
