import { clientApi } from "./ClientApi";

// 가상 코드리스트 타입
export interface Code {
  id: number;
  code: string;
}

// 가상 코드리스트를 가져오는 함수
export const codeList = async (): Promise<Code[]> => {
  const response = await clientApi.get<Code[]>("/code");
  return response.data;
};
