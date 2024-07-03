import { Box, Text, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import * as monaco from "monaco-editor";
import { executeCode } from "../api";

interface OutputProps {
  editorRef: React.RefObject<monaco.editor.IStandaloneCodeEditor>;
  language: string;
}

const Output: React.FC<OutputProps> = ({ editorRef, language }) => {
  const [output, setOutput] = useState<string | null>(null);
  const [isloading, setIsLoading] = useState<boolean>(false);

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
      setOutput(result.output);
    } catch (error) {
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
        border="1px solid"
        borderRadius={4}
        borderColor="#333"
      >
        {output ? output : "코드를 실행하려면 'Run Code' 버튼을 누르세요."}
      </Box>
    </Box>
  );
};

export default Output;
