import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import files, { FileType, FilesType } from "../files";
import { Flex, UnorderedList, ListItem } from "@chakra-ui/react";

interface MultiModelEditorProps {
  selectedFile: FileType;
}

const MultiModelEditor: React.FC<MultiModelEditorProps> = ({
  selectedFile,
}) => {
  return (
    <Editor
      height="90vh"
      width="60vw"
      theme="vs-dark"
      path={selectedFile.name}
      defaultLanguage={selectedFile.language}
      defaultValue={selectedFile.value}
    />
  );
};

export default MultiModelEditor;
