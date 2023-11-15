import { addMonths, format } from "date-fns";

type HeaderProps = {
  onChange: (date: Date) => void;
  visibleMonth: Date;
};
const Header = ({ visibleMonth, onChange }: HeaderProps) => {
  const handleMonthChange = (offset: number) =>
    onChange(addMonths(visibleMonth, offset));

  return (
    <div className="header">
      <button className="btn" onClick={() => onChange(new Date())}>
        Today
      </button>
      <div>
        <button
          className="month-change-btn"
          onClick={() => handleMonthChange(-1)}
        >
          &lt;
        </button>
        <button
          className="month-change-btn"
          onClick={() => handleMonthChange(1)}
        >
          &gt;
        </button>
      </div>
      <span className="month-title">{format(visibleMonth, "MMMM - yyyy")}</span>
    </div>
  );
};

export default Header;
