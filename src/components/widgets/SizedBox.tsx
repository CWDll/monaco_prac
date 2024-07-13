import React from "react";
import { StyledSizedBox } from "./style";

interface SizedBoxProps {
  width?: string;
  height?: string;
}

const SizedBox: React.FC<SizedBoxProps> = ({ width, height }) => {
  return <StyledSizedBox width={width} height={height} />;
};

export default SizedBox;
