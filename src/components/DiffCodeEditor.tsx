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

  // 콘솔 출력을 캡처하는 함수
  const captureConsoleOutput = (code: string) => {
    const consoleOutput: string[] = [];
    const originalConsoleLog = console.log;

    console.log = (message: any) => {
      consoleOutput.push(message);
    };

    try {
      eval(code);
    } catch (error: any) {
      consoleOutput.push(`Error: ${error.message}`);
    }

    console.log = originalConsoleLog;

    return consoleOutput.join("\n");
  };

  // 원본 코드를 실행하는 함수
  const runOriginalCode = () => {
    const originalCode = diffEditorRef.current?.getOriginalEditor().getValue();
    if (originalCode) {
      const output = captureConsoleOutput(originalCode);
      setOriginalOutput(output);
    }
  };

  // 수정된 코드를 실행하는 함수
  const runModifiedCode = () => {
    const modifiedCode = diffEditorRef.current?.getModifiedEditor().getValue();
    if (modifiedCode) {
      const output = captureConsoleOutput(modifiedCode);
      setModifiedOutput(output);
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
console.log(add(2, 3));
console.log(add(10, 110));`}
        modified={`function add(a, b, c = 0) {
  return a + b + c;
}
console.log(add(2, 3, 4));
console.log(add(1, 1, 1));`}
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
          resize="none"
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
          resize="none"
        />
      </VStack>
    </Box>
  );
};

export default DiffCodeEditor;
