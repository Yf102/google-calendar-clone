import * as yup from "yup";
import { parse } from "date-fns";

export const EventSchema = () =>
  yup
    .object({
      id: yup.string().default(crypto.randomUUID()),
      eventName: yup
        .string()
        .typeError("Event Name Required")
        .required("Event Name Required"),
      color: yup
        .string()
        .oneOf(["blue", "red", "green"] as const)
        .default("blue"),
      allDay: yup.boolean().default(false),
      startTime: yup.string(),
      endTime: yup.string(),
      date: yup.date().required(),
      apiErrors: yup.string(),
    })
    .test((value, ctx) => {
      if (!value.allDay) {
        if (
          !value?.startTime ||
          !value?.endTime ||
          value?.startTime === "" ||
          value?.endTime === "undefined"
        ) {
          return ctx.createError({
            message: "Start and end time required",
            path: "apiErrors",
          });
        }

        const date1 = parse(value?.startTime, "HH:mm", new Date());
        const date2 = parse(value?.endTime, "HH:mm", new Date());
        if (date1 > date2) {
          return ctx.createError({
            message: "Start time should be less than end time",
            path: "apiErrors",
          });
        }
      }

      if (value.allDay) {
        value.startTime = "";
        value.endTime = "";
      }

      return true;
    })
    .required();
