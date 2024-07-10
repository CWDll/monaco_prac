import React, { useState } from "react";
import { Flex, UnorderedList, ListItem } from "@chakra-ui/react";

import files, { FileType, FilesType } from "../files";
import MultiModelEditor from "../components/MultiModelEditor";

const TAEditPage = () => {
  const [fileName, setFileName] = useState<keyof FilesType>("script.js");
  const file: FileType = files[fileName];

  return (
    <Flex direction="row" padding={0}>
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
      <MultiModelEditor selectedFile={file} />
    </Flex>
  );
};

export default TAEditPage;
