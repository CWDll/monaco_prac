// src/App.tsx
import React, { useEffect } from "react";
import { Text } from "@chakra-ui/react";
import Container from "../components/widgets/Containert";
import Column from "../components/widgets/Column";
import Row from "../components/widgets/Row";
import SizedBox from "../components/widgets/SizedBox";
import Stack from "../components/widgets/Stack";
import MarkdownSection from "../components/MarkdownSection";

const Home: React.FC = () => {
  const [introText, setIntroText] = React.useState<string>("");
  const [fullIntroText, setFullIntroText] =
    React.useState<string>(" 플러터 위젯 테스트중 !");
  // const fullIntroText = "플러터 위젯 테스트중 !";
  const [changeText, setChangeText] = React.useState<string>("");

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      if (count === fullIntroText.length - 1) {
        count = 0;
        setIntroText("");
      } else {
        setIntroText((prev) => prev + fullIntroText[count]);

        ++count;
      }
    }, 200);

    return () => clearInterval(interval);
  }, [fullIntroText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFullIntroText(changeText);
    setIntroText("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>
        <Text as="mark" color="tomato" fontSize="xl">
          {introText}
        </Text>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={(e) => setChangeText(e.target.value)} />
          <button type="submit">Submit</button>
        </form>

        <h2>Column Example</h2>
        <Container
          width="200px"
          height="200px"
          backgroundColor="lightblue"
          borderRadius="5%"
        >
          <Column justifyContent="center" alignItems="center">
            <div>Item 1</div>
            <div>Item 2</div>
          </Column>
        </Container>

        <h2>Row Example</h2>
        <Container
          width="200px"
          height="200px"
          backgroundColor="lightgreen"
          boxShadow="5px 2px 2px white"
        >
          <Row justifyContent="space-between" alignItems="center">
            <div>Item 1</div>
            <div>Item 2</div>
          </Row>
        </Container>

        <h2>SizedBox Example</h2>
        <Container width="20vw" height="20vh" backgroundColor="lightcoral">
          <div>Above</div>
          <SizedBox height="20px" />
          <div>Below</div>
        </Container>

        <h2>Stack Example</h2>
        <Container width="200px" height="200px" backgroundColor="lightgrey">
          <Stack>
            <div
              style={{
                background: "rgba(255, 0, 0, 0.5)",
                width: "100%",
                height: "100%",
              }}
            >
              Layer 1
            </div>
            <div
              style={{
                background: "rgba(0, 255, 0, 0.5)",
                width: "80%",
                height: "80%",
              }}
            >
              Layer 2
            </div>
            <div
              style={{
                background: "rgba(0, 0, 255, 0.5)",
                width: "60%",
                height: "60%",
              }}
            >
              Layer 3
            </div>
          </Stack>
        </Container>
      </div>
      <MarkdownSection />
    </div>
  );
};

export default Home;
