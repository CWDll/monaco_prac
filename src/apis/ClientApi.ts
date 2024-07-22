import axios from "axios";

export const clientApi = axios.create({
  // .evn 파일을 생성해서 주소를 저장한 후 사용한다.
  //   baseURL: process.env.REACT_APP_SERVER_HOST,
  // 임시 url
  baseURL: "http://localhost:4000",
});
