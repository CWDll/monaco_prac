import { Box, Button, Flex } from "@chakra-ui/react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import CodeEditor from "./pages/CodeEditor";
import TADiffEditPage from "./pages/TADiffEditPage";
import Home from "./pages/Home";
import TAEditPage from "./pages/TAEditPage";

function App() {
  const location = useLocation();
  const getButtonColorScheme = (path: string) => {
    return location.pathname === path ? "teal" : "gray";
  };

  return (
    <Box minH="100vh" bg="#0f0a19" color="gray.500">
      <Flex justifyContent="space-between" alignItems="center" py={4} px={6}>
        <Link to="/">
          <Button color={getButtonColorScheme("/")}>Home</Button>
        </Link>
        <Flex justifyContent="center" alignItems="center" flex="1">
          <Link to="/code-editor">
            <Button mx={2} color={getButtonColorScheme("/code-editor")}>
              Code Editor
            </Button>
          </Link>
          <p>/</p>
          <Link to="/ta-diffEditPage">
            <Button mx={2} color={getButtonColorScheme("/ta-diffEditPage")}>
              TA Diff Edit Page
            </Button>
          </Link>
          <p>/</p>
          <Link to="/ta-editPage">
            <Button mx={2} color={getButtonColorScheme("/ta-editPage")}>
              TA Edit Page
            </Button>
          </Link>
        </Flex>
        <Flex width="2em"></Flex>
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
