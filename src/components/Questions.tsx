import { Box, Text, Button, Textarea, VStack, Input } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import * as monaco from "monaco-editor";

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

  // 줄바꿈을 <br /> 태그로 변환하는 함수 (빈 줄 제거)
  const formatTextWithLineBreaks = (text: string) => {
    return text
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));
  };

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
            <Text as="span" bg="blue.300" p={1} whiteSpace="pre-wrap">
              {formatTextWithLineBreaks(item.text)}
            </Text>
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
