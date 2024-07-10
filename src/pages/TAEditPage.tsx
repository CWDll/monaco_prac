import React, { useState } from "react";
import { Flex, UnorderedList, ListItem } from "@chakra-ui/react";

import files, { FileType, FilesType } from "../files";
import MultiModelEditor from "../components/MultiModelEditor";
import Chatting from "../components/Chatting";

const TAEditPage = () => {
  const [fileName, setFileName] = useState<keyof FilesType>("script.js");
  const file: FileType = files[fileName];

  const getColor = (currentFileName: keyof FilesType) => {
    return fileName === currentFileName ? "teal.500" : "gray.200";
  };

  const renderListItem = (currentFileName: keyof FilesType) => (
    <ListItem color={getColor(currentFileName)} key={currentFileName}>
      <button
        disabled={fileName === currentFileName}
        onClick={() => setFileName(currentFileName)}
      >
        {currentFileName}
      </button>
    </ListItem>
  );

  return (
    <Flex direction="row" padding={0}>
      <Flex direction="column" padding={6} pt={0} pb={0}>
        <UnorderedList>
          {renderListItem("script.js")}
          {renderListItem("style.css")}
          {renderListItem("index.html")}
        </UnorderedList>
      </Flex>
      <MultiModelEditor selectedFile={file} />
      <Chatting />
    </Flex>
  );
};

export default TAEditPage;
