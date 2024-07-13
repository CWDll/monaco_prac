import React, { ReactNode } from "react";
import { FlexContainer } from "./style";

interface RowProps {
  justifyContent?: string;
  alignItems?: string;
  children: ReactNode;
}

const Row: React.FC<RowProps> = ({ justifyContent, alignItems, children }) => {
  return (
    <FlexContainer
      flexDirection="row"
      justifyContent={justifyContent}
      alignItems={alignItems}
    >
      {children}
    </FlexContainer>
  );
};

export default Row;
