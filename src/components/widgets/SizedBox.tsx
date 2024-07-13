import React from "react";
import { StyledSizedBox } from "./style";

interface SizedBoxProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const SizedBox: React.FC<SizedBoxProps> = ({ width, height, borderRadius }) => {
  return (
    <StyledSizedBox width={width} height={height} borderRadius={borderRadius} />
  );
};

export default SizedBox;
