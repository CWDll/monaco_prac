import React, { ReactNode } from "react";
import { StyledStack, StackChild } from "./style";

interface StackProps {
  children: ReactNode[];
}

const Stack: React.FC<StackProps> = ({ children }) => {
  return (
    <StyledStack>
      {React.Children.map(children, (child, index) => (
        <StackChild key={index}>{child}</StackChild>
      ))}
    </StyledStack>
  );
};

export default Stack;
