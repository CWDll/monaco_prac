import React, { ReactNode } from "react";
import { FlexContainer } from "./style";

interface ColumnProps {
  justifyContent?: string;
  alignItems?: string;
  children: ReactNode;
}

const Column: React.FC<ColumnProps> = ({
  justifyContent,
  alignItems,
  children,
}) => {
  return (
    <FlexContainer
      flexDirection="column"
      justifyContent={justifyContent}
      alignItems={alignItems}
    >
      {children}
    </FlexContainer>
  );
};

export default Column;
