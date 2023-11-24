import * as yup from "yup";
import { parse } from "date-fns";

const TIME_REQUIRED_STRING = "Start and end time required";
const TIME_VALIDATION_STRING = "Start time must be earlier than end time";
const areTimesValid = (startTime?: string, endTime?: string) => {
  if (!startTime || !endTime || startTime === "" || endTime === "") {
    return false;
  }

  const date1 = parse(startTime, "HH:mm", new Date());
  const date2 = parse(endTime, "HH:mm", new Date());
  return date1 <= date2;
};

const timeSchema = () =>
  yup.object({
    allDay: yup.boolean().default(false),
    startTime: yup.string().when("allDay", {
      is: true,
      then: (schema) => schema.transform(() => undefined),
      otherwise: (schema) =>
        schema
          .required(TIME_REQUIRED_STRING)
          .test("startTime", TIME_VALIDATION_STRING, (value, context) =>
            areTimesValid(value, context.parent.endTime),
          ),
    }),
    endTime: yup.string().when("allDay", {
      is: true,
      then: (schema) => schema.transform(() => undefined),
      otherwise: (schema) =>
        schema
          .required(TIME_REQUIRED_STRING)
          .test("endTime", TIME_VALIDATION_STRING, (value, context) =>
            areTimesValid(context.parent.startTime, value),
          ),
    }),
  });

export const EventSchema = () =>
  yup
    .object({
      id: yup.string().required(),
      eventName: yup.string().required("Event Name Required"),
      color: yup
        .string()
        .oneOf(["blue", "red", "green"] as const)
        .default("blue"),
      date: yup.date().required(),
    })
    .concat(timeSchema());
