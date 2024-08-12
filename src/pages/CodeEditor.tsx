import React, {useRef, useState} from "react";
import { Box, HStack, Button, Input } from "@chakra-ui/react";
import { Editor, OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import LanguageSelector from "../components/LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Questions from "../components/Questions";

// 디렉토리 구조 데이터
const initialFileStructure = [
  {
    type: "folder",
    name: "components",
    children: [
      { type: "file", name: "Button.js" },
      { type: "file", name: "ButtonGroup.js" },
      { type: "file", name: "Dropdown.js" },
    ],
  },
  {
    type: "folder",
    name: "hooks",
    children: [
      { type: "file", name: "useFetch.js" },
      { type: "file", name: "useLocalStorage.js" },
    ],
  },
  // 추가적인 디렉토리 및 파일들
];

const FileTree = ({ structure, level = 0, onFileClick, onAddItem }) => {
  const [openFolders, setOpenFolders] = useState({});
  const [newItemName, setNewItemName] = useState("");

  const handleFolderClick = (folderName) => {
    setOpenFolders((prevState) => ({
      ...prevState,
      [folderName]: !prevState[folderName],
    }));
  };

  const handleAddItem = (type, parentFolder) => {
    if (newItemName.trim() === "") return;
    onAddItem(type, newItemName, parentFolder);
    setNewItemName(""); // 입력 필드 초기화
  };

  return (
      <ul style={{ paddingLeft: level * 10 }}>
        {structure.map((item, index) => (
            <li key={index} style={{ listStyleType: item.type === "folder" ? "disc" : "none" }}>
              {item.type === "folder" ? (
                  <>
              <span
                  onClick={() => handleFolderClick(item.name)}
                  style={{ cursor: "pointer", fontWeight: "bold" }}
              >
                {openFolders[item.name] ? "📂" : "📁"} {item.name}
              </span>
                    {openFolders[item.name] && (
                        <>
                          <FileTree
                              structure={item.children}
                              level={level + 1}
                              onFileClick={onFileClick}
                              onAddItem={onAddItem}
                          />
                          <div style={{ paddingLeft: 20 }}>
                            <Input
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                                placeholder="New item name"
                                size="sm"
                            />
                            <Button
                                size="xs"
                                onClick={() => handleAddItem("file", item.name)}
                                ml={2}
                            >
                              Add File
                            </Button>
                            <Button
                                size="xs"
                                onClick={() => handleAddItem("folder", item.name)}
                                ml={2}
                            >
                              Add Folder
                            </Button>
                          </div>
                        </>
                    )}
                  </>
              ) : (
                  <span
                      onClick={() => onFileClick(item.name)}
                      style={{ paddingLeft: "20px", cursor: "pointer" }}
                  >
              📄 {item.name}
            </span>
              )}
            </li>
        ))}
        {level === 0 && (
            <div>
              <Input
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="New item name"
                  size="sm"
              />
              <Button size="xs" onClick={() => handleAddItem("file")} ml={2}>
                Add File
              </Button>
              <Button size="xs" onClick={() => handleAddItem("folder")} ml={2}>
                Add Folder
              </Button>
            </div>
        )}
      </ul>
  );
};

const CodeEditor: React.FC = () => {
  const [fileStructure, setFileStructure] = useState(initialFileStructure);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [value, setValue] = useState<string>(CODE_SNIPPETS["javascript"]);
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
      const model = editorRef.current.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, selectedLanguage);
      }
    }
  };

  const handleFileClick = (fileName: string) => {
    setValue(`// This is the content of ${fileName}`);
  };

  const addItem = (type, name, parentFolder = null) => {
    const newStructure = [...fileStructure];

    const findFolderAndAddItem = (folder) => {
      if (folder.name === parentFolder) {
        folder.children.push({
          type: type,
          name: name,
          children: type === "folder" ? [] : undefined,
        });
        return true;
      } else if (folder.children && folder.children.length > 0) {
        for (let i = 0; i < folder.children.length; i++) {
          if (folder.children[i].type === "folder") {
            if (findFolderAndAddItem(folder.children[i])) return true;
          }
        }
      }
      return false;
    };

    if (parentFolder) {
      for (let i = 0; i < newStructure.length; i++) {
        if (newStructure[i].type === "folder") {
          if (findFolderAndAddItem(newStructure[i])) break;
        }
      }
    } else {
      newStructure.push({
        type: type,
        name: name,
        children: type === "folder" ? [] : undefined,
      });
    }

    setFileStructure(newStructure);
  };

  return (
      <Box>
        <HStack spacing={4}>
          <Box w="20%" borderRight="1px solid #ccc">
            <FileTree
                structure={fileStructure}
                onFileClick={handleFileClick}
                onAddItem={addItem}
            />
          </Box>
          <Box w="80%">
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
            <Questions
                editorRef={editorRef}
                language={language}
                highlightedText={highlightedText}
            />
          </Box>
        </HStack>
      </Box>
  );
};

export default CodeEditor;