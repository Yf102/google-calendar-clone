import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EventSchema } from "src/components/Calendar/modals/EventModal/EventSchema.ts";
import ErrorLabel from "src/components/ErrorLabel";
import ColorPicker from "src/components/ColorPicker";
import { EventFormType } from "src/components/Calendar/index.tsx";
import { useId } from "react";
import { useEventsData } from "src/context/useEventsData.ts";
import style from "src/components/Calendar/modals/EventModal/styles.module.css";

const EventForm = ({
  date,
  onClose,
  event,
  isEdit,
}: {
  date: Date;
  onClose: () => void;
  event?: EventFormType;
  isEdit: boolean;
}) => {
  const { addEvents, deleteEvent, updateEvent } = useEventsData();
  const id = useId();
  const methods = useForm({
    resolver: yupResolver(EventSchema()),
    defaultValues: {
      id: event?.id || crypto.randomUUID(),
      eventName: event?.eventName,
      color: event?.color || "blue",
      allDay: !!event?.allDay,
      startTime: event?.startTime,
      endTime: event?.endTime,
      date,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<EventFormType> = (data) => {
    isEdit ? updateEvent(data) : addEvents(data);
    onClose();
  };

  const onDelete = (event: EventFormType) => {
    deleteEvent(event.id, event.date);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data as EventFormType))}>
      <div className="form-group">
        <label htmlFor={"eventName-" + id}>Name</label>
        <input type="text" id={"eventName-" + id} {...register("eventName")} />
        {errors.eventName && (
          <ErrorLabel msg={errors.eventName.message} margin="0" />
        )}
      </div>
      <div className="form-group checkbox">
        <input type="checkbox" id={"allDay" + id} {...register("allDay")} />
        <label htmlFor={"allDay" + id}>All Day?</label>
      </div>
      <div className="row" style={{ display: "flex", flexDirection: "column" }}>
        <div className="row">
          <div className="form-group">
            <label htmlFor={"startTime" + id}>Start Time</label>
            <input
              className={style["input-element"]}
              type="time"
              id={"startTime" + id}
              {...register("startTime")}
              disabled={watch("allDay")}
            />
          </div>
          <div className="form-group">
            <label htmlFor={"endTime" + id}>End Time</label>
            <input
              className={style["input-element"]}
              type="time"
              id={"endTime" + id}
              {...register("endTime")}
              disabled={watch("allDay")}
            />
          </div>
        </div>
        {(errors.startTime || errors.endTime) && (
          <ErrorLabel
            msg={errors?.startTime?.message || errors?.endTime?.message}
          />
        )}
      </div>
      <FormProvider {...methods}>
        <ColorPicker />
      </FormProvider>
      <div className="row">
        <button className="btn btn-success" type="submit">
          {isEdit ? "Edit" : "Add"}
        </button>
        {isEdit && (
          <button
            className="btn btn-delete"
            type="button"
            onClick={() => event && onDelete(event)}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default EventForm;
