import { Box, HStack } from "@chakra-ui/react";
import { Editor, OnMount } from "@monaco-editor/react";
import React, { useState, useRef, useEffect } from "react";
import * as monaco from "monaco-editor";
import LanguageSelector from "../components/LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Questions from "../components/Questions";
// api 사용코드 예시(GET)
import {
  codeList,
  createItem,
  deleteItem,
  updateItem,
} from "../apis/CodeServiceAxios";
import { Code } from "../apis/Types";

const CodeEditor: React.FC = () => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [value, setValue] = useState<string>(CODE_SNIPPETS["javascript"]);
  const [language, setLanguage] = useState<string>("javascript");
  const [highlightedText, setHighlightedText] = useState<string | null>(null);

  // api 사용코드 예시(GET)
  /*
  const [loading, setLoading] = useState<boolean>(true);
  const [codes, setCodes] = useState<Code[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchCodes = async () => {
      try {
        setLoading(true);
        const data = await codeList();
        setCodes(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCodes();
  }, []);

  const handleCreateItem = async () => {
    try {
      const newItem = { id: 0, code: 'New Code' }; // 예시 데이터
      const createdItem = await createItem(newItem);
      setCodes([...codes, createdItem]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await deleteItem(id);
      setCodes(codes.filter(code => code.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUpdateItem = async (id: number) => {
    try {
      const updatedData = { id, code: 'Updated Code' }; // 예시 데이터
      const updatedItem = await updateItem(id, updatedData);
      setCodes(codes.map(code => (code.id === id ? updatedItem : code)));
    } catch (err: any) {
      setError(err.message);
    }
  };
  */

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

    const foldingController = editor.getContribution(
      "editor.contrib.folding"
    ) as any;
    const foldingModelPromise = foldingController.getFoldingModel();

    foldingModelPromise.then((foldingModel: any) => {
      if (foldingModel) {
        foldingModel.onDidChange(() => {
          const model = editor.getModel();
          if (model) {
            const foldedRanges = foldingModel.regions;
            const foldedTexts: string[] = [];

            for (let i = 0; i < foldedRanges.length; i++) {
              if (foldedRanges.isCollapsed(i)) {
                const startLineNumber = foldedRanges.getStartLineNumber(i);
                const endLineNumber = foldedRanges.getEndLineNumber(i) + 1; // 한 줄 추가
                const endColumn = model.getLineMaxColumn(endLineNumber - 1); // 추가된 줄의 마지막 열 번호
                const foldedText = model.getValueInRange(
                  new monaco.Range(startLineNumber, 1, endLineNumber, endColumn)
                );
                foldedTexts.push(foldedText);
              }
            }

            if (foldedTexts.length > 0) {
              setHighlightedText(foldedTexts.join("\n\n"));
            } else {
              setHighlightedText(null);
            }
          }
        });
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
