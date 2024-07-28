import { useState } from "react";
import * as S from "./style";
import { CalendarProps } from "react-calendar";
import moment from "moment";

const MyCalendar = () => {
  // useState 훅의 초기값으로 현재 날짜를 넣어줌
  const [today, setToday] = useState<Date>(new Date());

  // onChange 이벤트에 넣어줘서 날짜가 지날 때마다 today값이 업데이트 되도록 구현
  const onChangeToday = (): void => {
    setToday(today);
  };

  // 요일 이름 길게 만들기(ex. mon, tue, ... -> Monday, Tuesday, ...)
  const formatDay: CalendarProps["formatShortWeekday"] = (locale, date) => {
    return date.toLocaleDateString(locale, { weekday: "long" });
  };

  // 요일 이름 길게 만들기(ex. mon, tue, ... -> Monday, Tuesday, ...)
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month" && date.toDateString() === new Date().toDateString()) {
      return <span className="today-label">오늘</span>;
    }
    return null;
  };

  // 태그 삽입 날짜 리스트
  const dayList = [
    "2024-07-02",
    "2024-07-05",
    "2024-07-08",
    "2024-07-11",
    "2024-07-14",
    "2024-07-17",
    "2024-07-20",
  ];
  // 태그 삽입 날짜 타일에 컨텐츠 추가
  const addTag = ({ date }: any) => {
    // 해당 날짜(하루)에 추가할 컨텐츠의 배열
    const contents: any[] = [];

    // date가 dayList와 일치하면 태그 추가 (npm install moment)
    if (dayList.find((day) => day === moment(date).format("YYYY-MM-DD"))) {
      contents.push(<span className="tag">태그</span>);
    }
    return <div>{contents}</div>;
  };

  return (
    <S.CalendarBox>
      <S.StyleCalendar
        locale="en"
        calendarType="gregory"
        onChange={onChangeToday}
        value={today}
        formatShortWeekday={formatDay}
        // Icon을 next(prev)Label= 에 컴포넌트 형식으로 할당해주면 됨.
        nextLabel=">"
        prevLabel="<"
        // 이전 달, 다음 달 날짜 숨기기
        showNeighboringMonth={false}
        // 오늘 날짜를 "오눌"로 표시
        tileContent={addTag}
      />
    </S.CalendarBox>
  );
};

export default MyCalendar;
