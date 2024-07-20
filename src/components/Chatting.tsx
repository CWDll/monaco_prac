import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  Avatar,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const Chatting: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (inputValue.trim() === "") return;

    const newMessage: Message = { sender: "user", text: inputValue };
    setMessages([...messages, newMessage]);
    setLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        sender: "bot",
        text: "This is a bot response",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setLoading(false);
    }, 2000);

    setInputValue("");
  };

  // 엔터를 통한 채팅 전송
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Box
      w="full"
      maxW="md"
      mx="auto"
      bg="gray.800"
      p={4}
      rounded="md"
      boxShadow="lg"
    >
      <VStack spacing={4} align="stretch">
        <Box h="80vh" overflowY="auto" bg="gray.700" p={4} rounded="md">
          {messages.map((message, index) => (
            <HStack
              key={index}
              justifyContent={
                message.sender === "user" ? "flex-end" : "flex-start"
              }
              mb={2}
            >
              {message.sender === "bot" && <Avatar name="Bot" size="sm" />}
              <Box
                bg={message.sender === "user" ? "teal.500" : "gray.600"}
                color="white"
                px={4}
                py={2}
                rounded="md"
                maxW="80%"
              >
                <Text>{message.text}</Text>
              </Box>
              {message.sender === "user" && <Avatar name="User" size="sm" />}
            </HStack>
          ))}
          {loading && (
            <HStack justifyContent="flex-start" mb={2}>
              <Avatar name="Bot" size="sm" />
              <Box
                bg="gray.600"
                color="white"
                px={4}
                py={2}
                rounded="md"
                maxW="80%"
              >
                <HStack>
                  <Skeleton height="20px" width="10vw" />
                  <Spinner size={"lg"} />
                </HStack>
              </Box>
            </HStack>
          )}
        </Box>
        <HStack>
          <Input
            flex="1"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            bg="gray.600"
            border="none"
            _focus={{ borderColor: "teal.500" }}
            height="5vh"
          />
          <Button
            colorScheme="teal"
            onClick={handleSend}
            _hover={{ color: "teal.500" }}
          >
            Send
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Chatting;
