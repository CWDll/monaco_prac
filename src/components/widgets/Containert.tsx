// src/components/Container.tsx
import React, { ReactNode } from "react";
import { StyledContainer } from "./style";

interface ContainerProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  width,
  height,
  backgroundColor,
  children,
}) => {
  return (
    <StyledContainer
      width={width}
      height={height}
      backgroundColor={backgroundColor}
    >
      {children}
    </StyledContainer>
  );
};

export default Container;
