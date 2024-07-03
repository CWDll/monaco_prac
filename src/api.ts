import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
  headers: {
    "Content-Type": "application/json",
  },
});

/*
사용 가능한 언어 version을 확인하기 위한 함수

export const getRuntimes = async () => {
  const response = await API.get("/runtimes");
  return response.data;
};

const checkRuntimes = async () => {
  const runtimes = await getRuntimes();
  console.log(runtimes);
};

checkRuntimes();
*/
export const executeCode = async (language: string, sourceCode: string) => {
  const fileName = language === "typescript" ? "main.ts" : `main.${language}`;
  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    runtime: "deno",
    files: [
      {
        name: fileName,
        content: sourceCode,
      },
    ],
  });
  console.log("fileName: ", fileName);
  return response.data;
};
