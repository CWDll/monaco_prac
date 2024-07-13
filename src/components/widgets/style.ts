import styled from "styled-components";

// Column, Row
interface FlexProps {
  justifyContent?: string;
  alignItems?: string;
  flexDirection?: string;
  flexWrap?: string;
}

export const FlexContainer = styled.div<FlexProps>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
  align-items: ${({ alignItems }) => alignItems || "flex-start"};
  flex-direction: ${({ flexDirection }) => flexDirection || "row"};
  flex-wrap: ${({ flexWrap }) => flexWrap || "nowrap"};
`;
// Stack
export const StyledStack = styled.div`
  position: relative;
`;

export const StackChild = styled.div`
  position: absolute;
`;

// Container
interface ContainerProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  boxShadow?: string;
}

export const StyledContainer = styled.div<ContainerProps>`
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "auto"};
  background-color: ${({ backgroundColor }) =>
    backgroundColor || "transparent"};
  padding: ${({ padding }) => padding || "0"};
  margin: ${({ margin }) => margin || "0"};
  border-radius: ${({ borderRadius }) => borderRadius || "0"};
  box-shadow: ${({ boxShadow }) => boxShadow || "none"};
  display: flex;
  align-items: center;
  justify-content: center;
`;

// SizedBox
interface SizedBoxProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

export const StyledSizedBox = styled.div<SizedBoxProps>`
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "auto"};
  border-radius: ${({ borderRadius }) => borderRadius || "0"};
`;
