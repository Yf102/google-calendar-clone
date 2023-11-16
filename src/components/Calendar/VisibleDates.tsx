import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isPast,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import cn from "classnames";
import {
  Key,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { getDateKey } from "src/utils/helper.ts";
import EventsForDay from "src/components/Calendar/modals/EventsForDay";
import { useEventsData } from "src/context/EventProvider.tsx";
import CalendarEvent from "src/components/Calendar/CalendarEvent.tsx";
import EventModal from "src/components/Calendar/modals/EventModal";

type VisibleDatesProps = {
  visibleMonth: Date;
  startWeekSunday: boolean;
};

const VisibleDates = ({ visibleMonth, startWeekSunday }: VisibleDatesProps) => {
  const daysRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (visibleMonth) {
      daysRef.current?.scrollTo(0, 0);
    }
  }, [visibleMonth]);

  const weekStart: { locale?: Locale; weekStartsOn?: 0 | 1 } = {
    weekStartsOn: startWeekSunday ? 0 : 1,
  };

  const visibleDates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth), weekStart),
    end: endOfWeek(endOfMonth(visibleMonth), weekStart),
  });

  return (
    <div className="days" ref={daysRef}>
      {visibleDates.map((date, index) => {
        return (
          <CalendarDay
            date={date}
            visibleMonth={visibleMonth}
            showWeekName={index < 7}
            key={date.toDateString()}
          />
        );
      })}
    </div>
  );
};

type CalendarDayProps = {
  date: Date;
  visibleMonth: Date;
  showWeekName: boolean;
};
const CalendarDay = ({
  date,
  visibleMonth,
  showWeekName,
}: CalendarDayProps) => {
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [isViewMoreEventsModalOpen, setIsViewMoreEventsModalOpen] =
    useState(false);

  const { events } = useEventsData();

  return (
    <div
      key={date.toDateString()}
      className={cn("day", {
        "non-month-day": !isSameMonth(date, visibleMonth),
        "old-month-day": isPast(date) && !isToday(date),
      })}
    >
      <div className="day-header">
        {showWeekName && <div className="week-name">{format(date, "E")}</div>}
        <div className={`day-number ${isToday(date) && "today"}`}>
          {date.getDate()}
        </div>
        <button
          className="add-event-btn"
          onClick={() => setIsNewEventModalOpen(true)}
        >
          +
        </button>
      </div>
      {events[getDateKey(date)] && (
        <OverflowContainer
          className="events"
          getKey={(event) => event.id}
          items={events[getDateKey(date)]}
          renderItem={(event) => <CalendarEvent event={event} />}
          renderOverflow={(amount) => (
            <>
              <button
                className="events-view-more-btn"
                key="more"
                onClick={() => setIsViewMoreEventsModalOpen(true)}
              >
                +{amount} More
              </button>
              <EventsForDay
                isOpen={isViewMoreEventsModalOpen}
                onClose={() => setIsViewMoreEventsModalOpen(false)}
                events={events[getDateKey(date)]}
                date={date}
              />
            </>
          )}
        />
      )}
      <EventModal
        date={date}
        isOpen={isNewEventModalOpen}
        onClose={() => setIsNewEventModalOpen(false)}
      />
    </div>
  );
};

type OverflowContainerProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  renderOverflow: (overflowAmount: number) => ReactNode;
  className?: string;
  getKey: (item: T) => Key;
};

function OverflowContainer<T>({
  items,
  renderItem,
  renderOverflow,
  className,
  getKey,
}: OverflowContainerProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [overflowAmount, setOverflowAmount] = useState(0);

  useLayoutEffect(() => {
    if (containerRef.current == null) return;

    const observer = new ResizeObserver((entries) => {
      const containerElement = entries[0]?.target;
      if (containerElement == null) return;

      const overflowElement =
        containerElement.parentElement?.querySelector<HTMLElement>(
          "[data-overflow]",
        );
      if (overflowElement != null) overflowElement.style.display = "none";

      const children =
        containerElement.querySelectorAll<HTMLElement>("[data-item]");
      children.forEach((child) => child.style.removeProperty("display"));

      let amount = 0;
      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];
        if (containerElement.scrollHeight <= containerElement.clientHeight) {
          break;
        }
        amount = children.length - i;
        child.style.display = "none";
        overflowElement?.style.removeProperty("display");
      }
      setOverflowAmount(amount);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [items]);

  return (
    <>
      <div className={className} ref={containerRef}>
        {items.map((item) => (
          <div data-item key={getKey(item)}>
            {renderItem(item)}
          </div>
        ))}
      </div>
      <div data-overflow>{renderOverflow(overflowAmount)}</div>
    </>
  );
}
export default VisibleDates;
