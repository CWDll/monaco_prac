import { Box } from "@chakra-ui/react";
import { Editor, OnMount } from "@monaco-editor/react";
import React, { useState, useRef } from "react";
import * as monaco from "monaco-editor";
import LanguateSelector from "./LanguateSelector";

const CodeEditor: React.FC = () => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [value, setValue] = useState<string>();

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <Box>
      <LanguateSelector />
      <Editor
        height="75vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onMount={handleEditorMount}
        value={value}
        onChange={(val) => setValue(val || "")}
      />
    </Box>
  );
};

export default CodeEditor;
