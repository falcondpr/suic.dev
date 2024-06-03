import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfWeek,
} from "date-fns";
import clsx from "clsx";

import { viewStore } from "../store/view";
import styles from "./CalendarBody.module.css";

interface CalendarBodyProps {
  date: Date;
  setDate: (value: Date) => void;
}

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

const CalendarBody: React.FC<CalendarBodyProps> = ({
  date,
  setDate,
}) => {
  const { setActiveView } = viewStore((state) => state);

  const [currentMonth, setCurrentMonth] = useState(
    format(date, "MMM-yyyy")
  );
  const firstDayCurrentMonth = parse(
    currentMonth,
    "MMM-yyyy",
    new Date()
  );

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  const previousMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, {
      months: -1,
    });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, {
      months: 1,
    });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  return (
    <div>
      <header className={styles.header}>
        <button
          className={styles.button}
          onClick={() => setActiveView("months")}
        >
          <span className={styles.buttonText}>
            {format(firstDayCurrentMonth, "MMMM yyyy")}
          </span>
          <ChevronDown className={styles.chevronIcon} />
        </button>
        <div className={styles.navigation}>
          <button
            onClick={previousMonth}
            className={styles.navButton}
          >
            <ChevronLeft className={styles.chevronIcon} />
          </button>
          <button onClick={nextMonth} className={styles.navButton}>
            <ChevronRight className={styles.chevronIcon} />
          </button>
        </div>
      </header>

      <main>
        <div className={styles.daysHeader}>
          <p className={styles.dayLabel}>S</p>
          <p className={styles.dayLabel}>M</p>
          <p className={styles.dayLabel}>T</p>
          <p className={styles.dayLabel}>W</p>
          <p className={styles.dayLabel}>T</p>
          <p className={styles.dayLabel}>F</p>
          <p className={styles.dayLabel}>S</p>
        </div>

        <div className={styles.daysGrid}>
          {days.map((day, index) => (
            <button
              key={index}
              className={clsx(
                styles.dayButton,
                (index === 0 && colStartClasses[getDay(day)]) || "",
                isEqual(day, date) && !isToday(day)
                  ? styles.selectedDay
                  : "",
                isEqual(day, date) && !isToday(day)
                  ? styles.selectedDayHover
                  : "",
                !isEqual(day, date) && isToday(day)
                  ? styles.today
                  : "",
                !isEqual(day, date) &&
                  !isToday(day) &&
                  isSameMonth(day, firstDayCurrentMonth)
                  ? styles.currentMonth
                  : "",
                !isEqual(day, date) &&
                  !isToday(day) &&
                  !isSameMonth(day, firstDayCurrentMonth)
                  ? styles.otherMonth
                  : "",
                isEqual(day, date) &&
                  !isToday(day) &&
                  !isSameMonth(day, firstDayCurrentMonth)
                  ? styles.otherMonthSelected
                  : "",
                isEqual(day, date) && isToday(day)
                  ? styles.todaySelected
                  : "",
                isEqual(day, date) && isToday(day)
                  ? styles.todaySelectedHover
                  : "",
                !isEqual(day, date) ? styles.dayButtonHover : "",
                isEqual(day, date) || isToday(day)
                  ? styles.fontSemiBold
                  : ""
              )}
              onClick={() => setDate(day)}
            >
              {format(day, "d")}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CalendarBody;
