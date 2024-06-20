import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon } from "lucide-react";

import CalendarBody from "./CalendarBody";
import ListMonths from "./ListMonths";
import ListYears from "./ListYears";
import { viewStore } from "../store/view";

import styles from "./Calendar.module.css";
import "../index.css";

interface CalendarProps {
  date: Date;
  show: boolean;
  setShow: (value: boolean) => void;
  setDate: (value: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  date,
  setDate,
  setShow,
  show,
}) => {
  const { activeView, setActiveView } = viewStore((state) => state);

  // const setDay = (day: string) => {
  //   const newDate = new Date(
  //     date.getFullYear(),
  //     date.getMonth(),
  //     +day
  //   );
  //   setDate(newDate);
  // };

  const setMonth = (month: string) => {
    const newDate = new Date(
      date.getFullYear(),
      +month,
      date.getDate()
    );
    setDate(newDate);
  };

  const setYear = (year: string) => {
    const newDate = new Date(+year, date.getMonth(), date.getDate());
    setDate(newDate);
  };
  // rgb(220, 38, 38)
  useEffect(() => {
    setActiveView("calendar");
  }, [show, setActiveView]);

  return (
    <AnimatePresence>
      <div className="suic-calendar">
        <div className={styles.calendar}>
          <div className={styles.calendarContainer}>
            <div
              role="button"
              className={styles.calendarSubContainer}
              onClick={() => (show ? setShow(false) : setShow(true))}
            >
              <div className={styles.input2}>{date.getDate()}</div>
              <div className={styles.separator}>/</div>
              <div className={styles.input2}>
                {date.getMonth() + 1}
              </div>
              <div className={styles.separator}>/</div>

              <div className={styles.input}>{date.getFullYear()}</div>
            </div>

            <button
              className={styles.button}
              onClick={() => (show ? setShow(false) : setShow(true))}
            >
              <CalendarIcon
                size={20}
                className={styles.calendarIcon}
              />
            </button>
          </div>

          {show && (
            <div>
              <div
                className={styles.overlay}
                onClick={() => setShow(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className={styles.body}
              >
                <motion.div
                  key={activeView}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {activeView === "calendar" ? (
                    <CalendarBody date={date} setDate={setDate} />
                  ) : activeView === "months" ? (
                    <ListMonths date={date} setMonth={setMonth} />
                  ) : (
                    <ListYears date={date} setYear={setYear} />
                  )}
                </motion.div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
};

// export default Calendar;
