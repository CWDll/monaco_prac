import { Box, Text, Button } from "@chakra-ui/react";
import React from "react";
import * as monaco from "monaco-editor";
import { executeCode } from "../api";

interface OutputProps {
  editorRef: React.RefObject<monaco.editor.IStandaloneCodeEditor>;
  language: string;
}

const Output: React.FC<OutputProps> = ({ editorRef, language }) => {
  const runCode = async () => {
    if (!editorRef.current) {
      console.log("editorRef가 null값임.");
      return;
    }

    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      const result = await executeCode(language, sourceCode);
      console.log(result);
    } catch (error) {}
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        OutPut
      </Text>
      <Button variant="outline" colorScheme="green" mb={4} onClick={runCode}>
        Run Code
      </Button>
      <Box
        height="75vh"
        p={2}
        border="1px solid"
        borderRadius={4}
        borderColor="#333"
      >
        Here's an result.
      </Box>
    </Box>
  );
};

export default Output;
