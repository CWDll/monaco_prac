import axios from "axios";

export const clientApi = axios.create({
  // .evn 파일을 생성해서 주소를 저장한 후 사용한다.
  //   baseURL: process.env.REACT_APP_SERVER_HOST,
  // 임시 url
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 추가
clientApi.interceptors.request.use(
  (config) => {
    // 요청을 보내기 전에 수행할 작업
    // 예를 들어, 모든 요청에 인증 토큰을 추가
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 요청 오류가 있는 경우 작업 수행
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
clientApi.interceptors.response.use(
  (response) => {
    // 응답 데이터를 가공
    return response;
  },
  (error) => {
    // 응답 오류가 있는 경우 작업 수행
    if (error.response && error.response.status === 401) {
      // 예: 인증 오류가 발생한 경우 사용자에게 알림
      alert("인증 오류가 발생했습니다. 다시 로그인해주세요.");
      // 필요시 로그아웃 처리 등 추가 작업
    }
    return Promise.reject(error);
  }
);
