import { useContext } from "react";
import { EventsContext } from "./EventProvider.tsx";

export const useEventsData = () => {
  const context = useContext(EventsContext);
  if (context === null) {
    throw new Error("useEventsData must be used within a PnpRegContext");
  }
  return context;
};
