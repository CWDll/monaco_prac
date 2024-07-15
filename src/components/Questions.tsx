import { Box, Text, Button, Textarea, VStack, Input } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import * as monaco from "monaco-editor";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";

interface QuestionsProps {
  editorRef: React.RefObject<monaco.editor.IStandaloneCodeEditor>;
  language: string;
  highlightedText: string | null;
}

interface Question {
  text: string;
  question: string;
  answers: string[];
}

const Questions: React.FC<QuestionsProps> = ({ highlightedText }) => {
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answer, setAnswer] = useState("");
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<
    number | null
  >(null);

  const handleAddQuestion = () => {
    if (!highlightedText || highlightedText.trim() === "") {
      alert("코드를 선택해주세요.");
      return;
    }

    setQuestions([
      ...questions,
      { text: highlightedText, question, answers: [] },
    ]);
    setQuestion("");
  };

  const handleAddAnswer = () => {
    if (selectedQuestionIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[selectedQuestionIndex].answers.push(answer);
      setQuestions(updatedQuestions);
      setAnswer("");
    }
  };

  useEffect(() => {
    if (!highlightedText) {
      setQuestion("");
    }
  }, [highlightedText]);

  return (
    <Box w="50%">
      {highlightedText && (
        <VStack align="stretch" mb={4}>
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="질문을 입력하세요"
            resize="none"
          />
          <Button onClick={handleAddQuestion}>질문 남기기</Button>
        </VStack>
      )}
      <Box mt={4}>
        {questions.map((item, index) => (
          <Box key={index} mb={4}>
            <Box bg="gray.900" p={4} borderRadius="md">
              <ReactMarkdown
                children={item.text}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={okaidia}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              />
            </Box>
            <Text fontWeight="bold" mt={2} whiteSpace="pre-wrap">
              {item.question}
            </Text>
            {item.answers.map((ans, ansIndex) => (
              <Text key={ansIndex} ml={4} mt={1} whiteSpace="pre-wrap">
                {ans}
              </Text>
            ))}
            <Input
              placeholder="답변을 입력하세요"
              value={selectedQuestionIndex === index ? answer : ""}
              onChange={(e) => setAnswer(e.target.value)}
              onFocus={() => setSelectedQuestionIndex(index)}
            />
            <Button
              mt={2}
              onClick={handleAddAnswer}
              disabled={selectedQuestionIndex !== index}
            >
              답변 달기
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Questions;
