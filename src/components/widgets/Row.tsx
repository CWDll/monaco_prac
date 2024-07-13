import React, { ReactNode } from "react";
import { StyledRow } from "./style";

interface RowProps {
  children: ReactNode;
}

const Row: React.FC<RowProps> = ({ children }) => {
  return <StyledRow>{children}</StyledRow>;
};

export default Row;
