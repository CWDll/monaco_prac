import React, { useRef } from "react";
import { DiffEditor } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

const DiffCodeEditor = () => {
  const diffeditref = useRef<monaco.editor.IStandaloneDiffEditor | null>(null);
  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneDiffEditor
  ) => {
    diffeditref.current = editor;
  };
  return (
    <DiffEditor
      height="95vh"
      width="70vw"
      original="// Original code here"
      modified="// Modified code here"
      language="javascript"
      onMount={handleEditorDidMount}
    />
  );
};

export default DiffCodeEditor;
