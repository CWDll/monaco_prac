import React, { ReactNode } from "react";
import { StyledColumn } from "./style";

interface ColumnProps {
  children: ReactNode;
}

const Column: React.FC<ColumnProps> = ({ children }) => {
  return <StyledColumn>{children}</StyledColumn>;
};

export default Column;
