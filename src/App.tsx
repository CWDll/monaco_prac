import { Box, Button, Flex } from "@chakra-ui/react";
import { Routes, Route, Link } from "react-router-dom";
import CodeEditor from "./components/CodeEditor";
import TAPage from "./pages/TAPage";

function App() {
  return (
    <Box minH="100vh" bg="#0f0a19" color="gray.500">
      <Flex justifyContent="center" py={4}>
        <Link to="/code-editor">
          <Button mx={2} colorScheme="teal">
            Code Editor
          </Button>
        </Link>
        <Link to="/ta-page">
          <Button mx={2} colorScheme="teal">
            TA Page
          </Button>
        </Link>
      </Flex>
      <Routes>
        <Route path="/code-editor" element={<CodeEditor />} />
        <Route path="/ta-page" element={<TAPage />} />
      </Routes>
    </Box>
  );
}

export default App;
