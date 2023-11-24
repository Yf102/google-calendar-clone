import Header from "src/components/Calendar/Header.tsx";
import VisibleDates from "src/components/Calendar/VisibleDates.tsx";
import { useState } from "react";

export type EventFormType = {
  id: string;
  eventName: string;
  color: "blue" | "red" | "green";
  date: Date;
} & (AllDayEvent | TimedEvent);

export type AllDayEvent = {
  allDay: true;
  startTime?: never;
  endTime?: never;
};
export type TimedEvent = { allDay: false; startTime: string; endTime: string };

const Calendar = () => {
  const [visibleMonth, setVisibleMonth] = useState(new Date());

  return (
    <>
      <div className="calendar">
        <Header visibleMonth={visibleMonth} onChange={setVisibleMonth} />
        <VisibleDates visibleMonth={visibleMonth} startWeekSunday={false} />
      </div>
    </>
  );
};

export default Calendar;
