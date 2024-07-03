import { Box, chakra } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import React, { useState } from "react";

const CodeEditor: React.FC = () => {
  return (
    <Box>
      <Editor
        height="75vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue="// some comment"
      />
    </Box>
  );
};

export default CodeEditor;
