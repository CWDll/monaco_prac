import { useState } from "react";
import * as S from "./style";
import { CalendarProps } from "react-calendar";

const MyCalendar = () => {
  // useState 훅의 초기값으로 현재 날짜를 넣어줌
  const [today, setToday] = useState(new Date());

  // onChange 이벤트에 넣어줘서 날짜가 지날 때마다 today값이 업데이트 되도록 구현
  const onChangeToday = () => {
    setToday(today);
  };

  // 요일 이름 길게 만들기(ex. mon, tue, ... -> Monday, Tuesday, ...)
  const formatDay: CalendarProps["formatShortWeekday"] = (locale, date) => {
    return date.toLocaleDateString(locale, { weekday: "long" });
  };

  return (
    <S.CalendarBox>
      <S.StyleCalendar
        locale="en"
        onChange={onChangeToday}
        value={today}
        formatShortWeekday={formatDay}
      />
    </S.CalendarBox>
  );
};

export default MyCalendar;
