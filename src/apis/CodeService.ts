import { clientApi } from "./ClientApi";
import { Code } from "./Types";

// 가상 코드리스트를 가져오는 함수
export const codeList = async (): Promise<Code[]> => {
  const response = await clientApi.get<Code[]>("/code");
  return response.data;
};
