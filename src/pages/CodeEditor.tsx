import { Box, HStack } from "@chakra-ui/react";
import { Editor, OnMount } from "@monaco-editor/react";
import React, { useState, useRef } from "react";
import * as monaco from "monaco-editor";
import LanguageSelector from "../components/LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Questions from "../components/Questions";

const CodeEditor: React.FC = () => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [value, setValue] = useState<string>();
  const [language, setLanguage] = useState<string>("javascript");
  const [highlightedText, setHighlightedText] = useState<string | null>(null);

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    editor.onMouseUp(() => {
      const selectedText = window.getSelection()?.toString();
      if (selectedText) {
        setHighlightedText(selectedText);
      } else {
        setHighlightedText(null);
      }
    });
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
          <LanguageSelector language={language} onSelect={onSelect} />
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

        <Questions
          editorRef={editorRef}
          language={language}
          highlightedText={highlightedText}
        />
      </HStack>
    </Box>
  );
};

export default CodeEditor;
