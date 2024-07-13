// src/components/Container.tsx
import React, { ReactNode } from "react";
import { StyledContainer } from "./style";

interface ContainerProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  boxShadow?: string;
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  width,
  height,
  backgroundColor,
  padding,
  margin,
  borderRadius,
  boxShadow,
  children,
}) => {
  return (
    <StyledContainer
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      padding={padding}
      margin={margin}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
    >
      {children}
    </StyledContainer>
  );
};

export default Container;
