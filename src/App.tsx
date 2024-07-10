import { Box, Button, Flex } from "@chakra-ui/react";
import { Routes, Route, Link } from "react-router-dom";
import CodeEditor from "./pages/CodeEditor";
import TADiffEditPage from "./pages/TADiffEditPage";
import Home from "./pages/Home";
import TAEditPage from "./pages/TAEditPage";

function App() {
  return (
    <Box minH="100vh" bg="#0f0a19" color="gray.500">
      <Box>sd</Box>
      <Flex justifyContent="center" py={4}>
        <Link to="/code-editor">
          <Button mx={2} colorScheme="teal">
            Code Editor
          </Button>
        </Link>
        <p>/</p>
        <Link to="/ta-diffEditPage">
          <Button mx={2} colorScheme="teal">
            TA Diff Edit Page
          </Button>
        </Link>
        <p>/</p>
        <Link to="/ta-editPage">
          <Button mx={2} colorScheme="teal">
            TA Edit Page
          </Button>
        </Link>
      </Flex>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/code-editor" element={<CodeEditor />} />
        <Route path="/ta-diffEditPage" element={<TADiffEditPage />} />
        <Route path="/ta-editPage" element={<TAEditPage />} />
      </Routes>
    </Box>
  );
}

export default App;
