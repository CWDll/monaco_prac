import React, { useRef } from "react";
import { DiffEditor } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { Box, Button } from "@chakra-ui/react";

const DiffCodeEditor = () => {
  const diffEditorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(
    null
  );
  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneDiffEditor
  ) => {
    diffEditorRef.current = editor;
  };

  //  비교하는 각 코드를 각자 실행하는 코드(run API 추가 필요)
  function runOriginalCode() {
    const originalCode = diffEditorRef.current?.getOriginalEditor().getValue();
    // 실행 로직 추가
    console.log("Original Code Output:", originalCode);
  }

  function runModifiedCode() {
    const modifiedCode = diffEditorRef.current?.getModifiedEditor().getValue();
    // 실행 로직 추가
    console.log("Modified Code Output:", modifiedCode);
  }

  return (
    <Box>
      <DiffEditor
        height="95vh"
        width="70vw"
        original="// Original code here"
        modified="// Modified code here"
        language="javascript"
        onMount={handleEditorDidMount}
      />
      <Button onClick={runOriginalCode}>Run Original Code</Button>
      &nbsp;
      <Button onClick={runModifiedCode}>Run Modified Code</Button>
    </Box>
  );
};

export default DiffCodeEditor;
