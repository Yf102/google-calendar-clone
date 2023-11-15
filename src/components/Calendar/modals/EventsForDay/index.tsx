import Modal, { ModalProps } from "src/components/Modal";
import { EventFormType } from "src/components/Calendar/index.tsx";
import { format } from "date-fns";
import CalendarEvent from "src/components/Calendar/CalendarEvent.tsx";

type EventsForDayProps = {
  date: Date;
  events?: EventFormType[];
} & Omit<ModalProps, "children">;
const EventsForDay = ({ date, events, ...modalProps }: EventsForDayProps) => {
  return (
    <Modal {...modalProps}>
      <div className="modal">
        <div className="overlay"></div>
        <div className="modal-body">
          <div className="modal-title">
            <div>{format(date, "dd/MM/yyyy")}</div>
            <button className="close-btn" onClick={modalProps.onClose}>
              &times;
            </button>
          </div>
          <div className="events">
            {events?.map((event) => (
              <CalendarEvent key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EventsForDay;
