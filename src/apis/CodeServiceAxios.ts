import { clientApi } from "./ClientApi";
import { Code } from "./Types";

// 가상 코드리스트를 가져오는 함수
export const codeList = async (): Promise<Code[]> => {
  const response = await clientApi.get<Code[]>("/code");
  return response.data;
};

// 새로운 코드를 생성하는 함수
export const createItem = async (newData: Code): Promise<Code> => {
  const response = await clientApi.post<Code>("/code", newData);
  return response.data;
};

// 코드를 삭제하는 함수
export const deleteItem = async (id: number): Promise<void> => {
  await clientApi.delete(`/code/${id}`);
};

// 코드를 업데이트하는 함수
export const updateItem = async (
  id: number,
  updatedData: Code
): Promise<Code> => {
  const response = await clientApi.put<Code>(`/code/${id}`, updatedData);
  return response.data;
};
