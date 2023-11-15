import Modal, { ModalProps } from "src/components/Modal";
import { format } from "date-fns";
import EventForm from "src/components/Calendar/modals/EventModal/EventForm.tsx";
import { EventFormType } from "src/components/Calendar/index.tsx";

type AddEventProps = {
  date: Date;
  event?: EventFormType;
} & Omit<ModalProps, "children">;
const EventModal = ({ date, event, onClose, ...modalProps }: AddEventProps) => {
  const isEdit = !!event;
  return (
    <Modal {...modalProps} onClose={onClose}>
      <>
        <div className="modal-title">
          <div>{isEdit ? "Edit" : "Add"} Event</div>
          <small>{format(date, "dd/MM/yyyy")}</small>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <EventForm
          date={date}
          onClose={onClose}
          event={event}
          isEdit={isEdit}
        />
      </>
    </Modal>
  );
};

export default EventModal;
