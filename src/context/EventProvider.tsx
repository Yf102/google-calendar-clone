import { EventFormType } from "src/components/Calendar";
import { createContext, ReactNode } from "react";
import { useLocalStorage } from "src/hooks/useLocalStorage.ts";
import { getDateKey } from "src/utils/helper.ts";

export type EventsType = Record<string, EventFormType[]>;

type EventsContextType = {
  events: EventsType;
  addEvents: (event: EventFormType) => void;
  deleteEvent: (id: string, date: Date) => void;
  updateEvent: (event: EventFormType) => void;
};

export const EventsContext = createContext<EventsContextType | null>(null);
const EventProvider = ({ children }: { children: ReactNode }) => {
  const { storedValue: events, setStoredValue: setEvents } =
    useLocalStorage<EventsType>("EVENTS", {});

  const addEvents = (event: EventFormType) => {
    setEvents((old) => {
      const eventsForDay = old[getDateKey(event.date)] || [];
      eventsForDay.push(event);
      eventsForDay.sort((a, b) => {
        if (a.allDay && !b.allDay) return -1;
        if (!a.allDay && b.allDay) return 1;
        if (a.startTime && b.startTime) {
          return a.startTime.localeCompare(b.startTime);
        }
        return 0;
      });

      return { ...old, ...{ [getDateKey(event.date)]: eventsForDay } };
    });
  };

  const updateEvent = (event: EventFormType) => {
    setEvents((old) => {
      return {
        ...old,
        ...{
          [getDateKey(event.date)]: old[getDateKey(event.date)].map((e) =>
            e.id === event.id ? event : e,
          ),
        },
      };
    });
  };

  const deleteEvent = (id: string, date: Date) => {
    setEvents((old) => {
      return {
        ...old,
        ...{
          [getDateKey(date)]: old[getDateKey(date)].filter(
            (event) => event.id !== id,
          ),
        },
      };
    });
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        addEvents,
        deleteEvent,
        updateEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export default EventProvider;
