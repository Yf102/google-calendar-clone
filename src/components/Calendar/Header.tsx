import { addMonths, format } from "date-fns";
import styles from "./Calendar.module.css";

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
      <div className={styles["header-wrapper"]}>
        <div className={styles["navigation-wrapper"]}>
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

          <span className="month-title">
            {format(visibleMonth, "MMMM - yyyy")}
          </span>
        </div>
        <a
          href="https://github.com/Yf102/google-calendar-clone"
          target="_blank"
        >
          <img src="/github.svg" width={24} height={24} />
        </a>
      </div>
    </div>
  );
};

export default Header;
