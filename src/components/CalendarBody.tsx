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
  setDefaultOptions,
  startOfWeek,
} from "date-fns";
import clsx from "clsx";

import { viewStore } from "../store/view";
import styles from "./CalendarBody.module.css";

import { es } from "date-fns/locale";
setDefaultOptions({ locale: es });

interface CalendarBodyProps {
  date: Date;
  setDate: (value: Date) => void;
}

const colStartClasses = [
  "col-start-1",
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
    start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 0 }), // Set week start to Sunday
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), {
      weekStartsOn: 0,
    }), // Set week end to Saturday
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
          <p className={styles.dayLabel}>D</p>
          <p className={styles.dayLabel}>L</p>
          <p className={styles.dayLabel}>M</p>
          <p className={styles.dayLabel}>M</p>
          <p className={styles.dayLabel}>J</p>
          <p className={styles.dayLabel}>V</p>
          <p className={styles.dayLabel}>S</p>
        </div>

        <div className={styles.daysGrid}>
          {days.map((day, index) => {
            const currentDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
            const currentDay = `${day.getDate()}/${day.getMonth()}/${day.getFullYear()}`;

            return (
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
                  currentDate === currentDay && isToday(day)
                    ? styles.todaySelected
                    : "",
                  currentDate === currentDay && isToday(day)
                    ? styles.todaySelectedHover
                    : "",
                  !isEqual(day, date) ? styles.dayButtonHover : "",
                  isEqual(day, date) || isToday(day)
                    ? styles.fontSemiBold
                    : ""
                )}
                onClick={() => setDate(day)}
              >
                {format(day, "dd")}
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default CalendarBody;
