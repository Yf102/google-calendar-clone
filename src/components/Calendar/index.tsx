import Header from "src/components/Calendar/Header.tsx";
import VisibleDates from "src/components/Calendar/VisibleDates.tsx";
import { useState } from "react";

export type EventFormType = {
  id: string;
  eventName: string;
  color: "blue" | "red" | "green";
  date: Date;
  allDay: boolean;
  startTime?: string;
  endTime?: string;
};

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
