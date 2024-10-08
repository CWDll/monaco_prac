import { Box, Text, Button, VStack, Input } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import * as monaco from "monaco-editor";
import MDEditor from "@uiw/react-md-editor";

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

const Questions: React.FC<QuestionsProps> = ({ highlightedText, language }) => {
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

    const codeBlock = `\`\`\`${language}\n${highlightedText}\n\`\`\``;

    setQuestions([...questions, { text: codeBlock, question, answers: [] }]);
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

  // 엔터를 통해 질문 등록, 답변 등록
  const handleQuestionKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddQuestion();
    }
  };

  const handleAnswerKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddAnswer();
    }
  };

  return (
    <Box w="50%">
      {highlightedText && (
        <VStack align="stretch" mb={4} data-color-mode="light">
          <Box bg="gray.900" p={4} borderRadius="md">
            <MDEditor.Markdown
              source={`\`\`\`${language}\n${highlightedText}\n\`\`\``}
              data-color-mode="dark"
            />
          </Box>
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="질문을 입력하세요"
            onKeyDown={handleQuestionKeyPress}
          />
          <Button onClick={handleAddQuestion}>질문 남기기</Button>
        </VStack>
      )}
      <Box mt={4}>
        {questions.map((item, index) => (
          <Box key={index} mb={4} data-color-mode="dark">
            <Box bg="gray.900" p={4} borderRadius="md">
              <MDEditor.Markdown source={item.text} />
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
              onKeyDown={handleAnswerKeyPress}
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
