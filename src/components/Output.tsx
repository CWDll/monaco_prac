import { Box, Text, Button, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import * as monaco from "monaco-editor";
import { executeCode } from "../api";

interface OutputProps {
  editorRef: React.RefObject<monaco.editor.IStandaloneCodeEditor>;
  language: string;
}

const Output: React.FC<OutputProps> = ({ editorRef, language }) => {
  const [output, setOutput] = useState<string[] | null>(null);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const toast = useToast();

  const runCode = async () => {
    // null값인지를 먼저 체크해줘야 getValue()를 사용할 수 있음.
    if (!editorRef.current) {
      console.log("editorRef가 null값임.");
      return;
    }

    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      // 결과값의 run속성을 result에 할당함
      const { run: result } = await executeCode(language, sourceCode);
      // 결과값에 줄바꿈이 적용되지 않고 '\n'이 나오므로, split을 사용해 줄바꿈을 적용하기 위해 나눔
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error: Error | any) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Please try again.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        OutPut
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        onClick={runCode}
        isLoading={isloading}
      >
        Run Code
      </Button>
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.500" : "white"}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, index) => (
              <Text key={index} whiteSpace="pre-wrap">
                {line}
              </Text>
            ))
          : "코드를 실행하려면 'Run Code' 버튼을 누르세요."}
      </Box>
    </Box>
  );
};

export default Output;
