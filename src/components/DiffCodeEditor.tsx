import React, { useRef, useState } from "react";
import { DiffEditor } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { Box, Button, VStack, Textarea, Heading } from "@chakra-ui/react";

const DiffCodeEditor = () => {
  const diffEditorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(
    null
  );
  const [originalOutput, setOriginalOutput] = useState("");
  const [modifiedOutput, setModifiedOutput] = useState("");

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneDiffEditor
  ) => {
    diffEditorRef.current = editor;
  };

  // 원본 코드를 실행하는 함수
  const runOriginalCode = () => {
    const originalCode = diffEditorRef.current?.getOriginalEditor().getValue();
    if (originalCode) {
      try {
        // eslint-disable-next-line no-eval
        const output = eval(originalCode);
        setOriginalOutput(output);
      } catch (error: Error | any) {
        setOriginalOutput(`Error: ${error.message}`);
      }
    }
  };

  // 수정된 코드를 실행하는 함수
  const runModifiedCode = () => {
    const modifiedCode = diffEditorRef.current?.getModifiedEditor().getValue();
    if (modifiedCode) {
      try {
        // eslint-disable-next-line no-eval
        const output = eval(modifiedCode);
        setModifiedOutput(output);
      } catch (error: Error | any) {
        setModifiedOutput(`Error: ${error.message}`);
      }
    }
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4} color="teal.500">
        Diff Code Editor
      </Heading>
      <DiffEditor
        height="50vh"
        width="80vw"
        original={`function add(a, b) {
  return a + b;
}

console.log(add(2, 3));`}
        modified={`function add(a, b, c = 0) {
  return a + b + c;
}

console.log(add(2, 3, 4));`}
        language="javascript"
        onMount={handleEditorDidMount}
      />
      <VStack mt={4} spacing={4} align="stretch">
        <Button colorScheme="teal" onClick={runOriginalCode}>
          Run Original Code
        </Button>
        <Textarea
          value={originalOutput}
          placeholder="Original Code Output"
          isReadOnly
          size="sm"
          bg="gray.800"
          color="white"
        />
        <Button colorScheme="teal" onClick={runModifiedCode}>
          Run Modified Code
        </Button>
        <Textarea
          value={modifiedOutput}
          placeholder="Modified Code Output"
          isReadOnly
          size="sm"
          bg="gray.800"
          color="white"
        />
      </VStack>
    </Box>
  );
};

export default DiffCodeEditor;
