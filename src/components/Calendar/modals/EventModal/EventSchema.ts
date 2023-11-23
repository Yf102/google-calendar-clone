import * as yup from "yup";
import { parse } from "date-fns";
import { AnyObject, TestContext } from "yup";

const areTimesValid = (
  ctx: TestContext<AnyObject>,
  startTime?: string,
  endTime?: string,
) => {
  if (!startTime || !endTime || startTime === "" || endTime === "undefined") {
    return ctx.createError({
      message: "Start and end time required",
      path: "apiErrors",
    });
  }

  const date1 = parse(startTime, "HH:mm", new Date());
  const date2 = parse(endTime, "HH:mm", new Date());
  if (date1 > date2) {
    return ctx.createError({
      message: "Start time should be earlier than end time",
      path: "apiErrors",
    });
  }
  return true;
};

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
      allDay: yup.boolean().default(false),
      startTime: yup.string().when("allDay", {
        is: false,
        then: (schema) =>
          schema
            .required("Start and end time required")
            .test((value, context) =>
              areTimesValid(context, value, context.parent.endTime),
            ),
        otherwise: (schema) => schema.notRequired(),
      }),
      endTime: yup.string().when("allDay", {
        is: false,
        then: (schema) =>
          schema
            .required("Start and end time required")
            .test((value, context) =>
              areTimesValid(context, context.parent.startTime, value),
            ),
        otherwise: (schema) => schema.notRequired(),
      }),
      apiErrors: yup.string(),
    })
    .test((value) => {
      if (value.allDay) {
        delete value.startTime;
        delete value.endTime;
      }

      delete value.apiErrors;
      return true;
    })
    .required();
