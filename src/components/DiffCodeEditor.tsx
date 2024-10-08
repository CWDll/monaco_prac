import React, { useRef, useState } from "react";
import { DiffEditor } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { Box, Button, VStack, Textarea, Heading, Text } from "@chakra-ui/react";

const DiffCodeEditor = () => {
  const diffEditorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(
    null
  );
  const [originalOutput, setOriginalOutput] = useState<string>("");
  const [modifiedOutput, setModifiedOutput] = useState<string>("");
  const [isSameResult, setIsSameResult] = useState<boolean>(false);
  const [hasRunOriginal, setHasRunOriginal] = useState<boolean>(false);
  const [hasRunModified, setHasRunModified] = useState<boolean>(false);

  // 내부에서 실행하는 원본 코드(Read-Only)
  const originalCode = `function add(a, b) {
    return a + b; 
  }
  console.log(add(10, 110));`;

  // 내부에서 실행하는 수정 가능한 코드(Read-Writable)
  const modifiedCode = `function add(a, b, c = 0) {
    return a + b + c;
  }
  console.log(add(10, 20, 90));`;

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
      // eslint-disable-next-line no-eval
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
      setHasRunOriginal(true);
      if (hasRunModified) {
        CheckResult(output, modifiedOutput);
      }
    }
  };

  // 수정된 코드를 실행하는 함수
  const runModifiedCode = () => {
    const modifiedCode = diffEditorRef.current?.getModifiedEditor().getValue();
    if (modifiedCode) {
      const output = captureConsoleOutput(modifiedCode);
      setModifiedOutput(output);
      setHasRunModified(true);
      if (hasRunOriginal) {
        CheckResult(originalOutput, output);
      }
    }
  };

  const CheckResult = (originalOutput: string, modifiedOutput: string) => {
    if (originalOutput === modifiedOutput) {
      setIsSameResult(true);
    } else {
      setIsSameResult(false);
    }
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4} color="teal.500">
        Diff Code Editor
      </Heading>
      <Box
        height={{ base: "40vh", md: "50vh" }}
        width={{ base: "100vw", md: "80vw" }}
      >
        <DiffEditor
          height={"100%"}
          width={"100%"}
          theme="vs-dark"
          original={originalCode}
          modified={modifiedCode}
          language="javascript"
          onMount={handleEditorDidMount}
        />
      </Box>
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
        {hasRunOriginal &&
          hasRunModified &&
          (isSameResult ? (
            <Text color="green.500">Same Result</Text>
          ) : (
            <Text color="red.500">Different Result</Text>
          ))}
      </VStack>
    </Box>
  );
};

export default DiffCodeEditor;
