import { Box, HStack } from "@chakra-ui/react";
import { Editor, OnMount } from "@monaco-editor/react";
import React, { useState, useRef } from "react";
import * as monaco from "monaco-editor";
import LanguateSelector from "./LanguateSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor: React.FC = () => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [value, setValue] = useState<string>();
  const [language, setLanguage] = useState<string>("javascript");

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    setValue(CODE_SNIPPETS[selectedLanguage] || "");
    if (editorRef.current) {
      monaco.editor.setModelLanguage(
        editorRef.current.getModel()!,
        selectedLanguage
      );
    }
  };

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          <LanguateSelector language={language} onSelect={onSelect} />
          <Editor
            height="75vh"
            theme="vs-dark"
            defaultValue={CODE_SNIPPETS[language]}
            language={language}
            onMount={handleEditorMount}
            value={value}
            onChange={(val) => setValue(val || "")}
          />
        </Box>

        <Output editorRef={editorRef} language={language} />
      </HStack>
    </Box>
  );
};

export default CodeEditor;
