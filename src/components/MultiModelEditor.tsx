import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import files, { FileType, FilesType } from "../files";
import { Flex } from "@chakra-ui/react";

function MultiModelEditor() {
  const [fileName, setFileName] = useState<keyof FilesType>("script.js");

  const file: FileType = files[fileName];

  return (
    <>
      <Flex direction="column" padding={0}>
        <button
          disabled={fileName === "script.js"}
          onClick={() => setFileName("script.js")}
        >
          script.js
        </button>
        <button
          disabled={fileName === "style.css"}
          onClick={() => setFileName("style.css")}
        >
          style.css
        </button>
        <button
          disabled={fileName === "index.html"}
          onClick={() => setFileName("index.html")}
        >
          index.html
        </button>
      </Flex>
      <Editor
        height="80vh"
        width="70vw"
        theme="vs-dark"
        path={file.name}
        defaultLanguage={file.language}
        defaultValue={file.value}
      />
    </>
  );
}

export default MultiModelEditor;
