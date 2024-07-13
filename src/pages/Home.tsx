// src/App.tsx
import React from "react";
import Container from "../components/widgets/Containert";
import Column from "../components/widgets/Column";
import Row from "../components/widgets/Row";
import SizedBox from "../components/widgets/SizedBox";
import Stack from "../components/widgets/Stack";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Flutter Widgets in React</h1>
      <Container width="200px" height="200px" backgroundColor="lightblue">
        <Column>
          <Row>
            <div>Row Item 1</div>
            <div>Row Item 2</div>
          </Row>
          <SizedBox height="20px" />
          <div>Column Item 1</div>
        </Column>
      </Container>
      <Stack>
        <div>Stack Item 1</div>
        <div>Stack Item 2</div>
        <div>Stack Item 3</div>
        <div>Stack Item 4</div>
      </Stack>
    </div>
  );
};

export default Home;
