import { Flex } from "@chakra-ui/react";
import React from "react";
import MultiModelEditor from "../components/MultiModelEditor";

const TAEditPage = () => {
  return (
    <Flex direction="row" padding={0}>
      <MultiModelEditor />
    </Flex>
  );
};

export default TAEditPage;
