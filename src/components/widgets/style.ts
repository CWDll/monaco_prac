import styled from "styled-components";

// Column
export const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

// Row
export const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
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
}

export const StyledSizedBox = styled.div<SizedBoxProps>`
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "auto"};
`;
