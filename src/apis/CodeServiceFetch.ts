import { Code } from "./Types";

// fetch 사용 예시 코드임.
export const codeList = async (): Promise<Code[]> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/board`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

export const createItem = async (newData: Code): Promise<Code> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/board`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

export const deleteItem = async (id: number): Promise<void> => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/board/${id}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
};

export const updateItem = async (
  id: number,
  updatedData: Code
): Promise<Code> => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/board/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};
