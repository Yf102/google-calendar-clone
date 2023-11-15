import { useFormContext } from "react-hook-form";
import { Fragment, useId } from "react";
import { EventFormType } from "src/components/Calendar";

const COLORS = ["blue", "red", "green"];
const ColorPicker = () => {
  const { register, getValues } = useFormContext<EventFormType>();
  const id = useId();
  return (
    <div className="form-group">
      <label>Color</label>
      <div className="row left">
        {COLORS.map((color) => {
          return (
            <Fragment key={color}>
              <input
                defaultChecked={color === getValues("color")}
                {...register("color")}
                type="radio"
                name="color"
                value={color}
                id={color + id}
                className="color-radio"
              />
              <label htmlFor={color + id}>
                <span className="sr-only">Blue</span>
              </label>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ColorPicker;
