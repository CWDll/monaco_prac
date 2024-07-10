import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import files, { FileType, FilesType } from "../files";
import { Flex, UnorderedList, ListItem } from "@chakra-ui/react";

function MultiModelEditor() {
  const [fileName, setFileName] = useState<keyof FilesType>("script.js");

  const file: FileType = files[fileName];

  return (
    <>
      <Flex direction="column" padding={6} pt={0} pb={0}>
        <UnorderedList>
          <ListItem>
            <button
              disabled={fileName === "script.js"}
              onClick={() => setFileName("script.js")}
            >
              script.js
            </button>
          </ListItem>
          <ListItem>
            <button
              disabled={fileName === "style.css"}
              onClick={() => setFileName("style.css")}
            >
              style.css
            </button>
          </ListItem>
          <ListItem>
            <button
              disabled={fileName === "index.html"}
              onClick={() => setFileName("index.html")}
            >
              index.html
            </button>
          </ListItem>
        </UnorderedList>
      </Flex>
      <Editor
        height="90vh"
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
