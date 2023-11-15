import { EventFormType } from "src/components/Calendar/index.tsx";
import cn from "classnames";
import EventModal from "src/components/Calendar/modals/EventModal";
import { useState } from "react";

const CalendarEvent = ({ event }: { event: EventFormType }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsEditModalOpen(true)}
        className={cn(`event `, event.color, {
          "all-day-event": event.allDay,
        })}
      >
        {event.allDay ? (
          <div className="event-name">{event.eventName}</div>
        ) : (
          <>
            <div className={`color-dot ${event.color}`}></div>
            <div className="event-time">{event.startTime}</div>
            <div className="event-name">{event.eventName}</div>
          </>
        )}
      </button>
      <EventModal
        event={event}
        date={event.date}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
};

export default CalendarEvent;
