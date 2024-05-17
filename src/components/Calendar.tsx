import { motion, AnimatePresence } from "framer-motion";

import CalendarBody from "./CalendarBody";
import ListMonths from "./ListMonths";
import ListYears from "./ListYears";
import { viewStore } from "../store/view";

interface CalendarProps {
  date: Date;
  show: boolean;
  setShow: (value: boolean) => void;
  setDate: (value: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  date,
  setDate,
  setShow,
  show,
}) => {
  const { activeView } = viewStore((state) => state);

  const setMonth = (month: number) => {
    const newDate = new Date(
      date.getFullYear(),
      month,
      date.getDate()
    );
    setDate(newDate);
  };

  const setYear = (year: number) => {
    const newDate = new Date(year, date.getMonth(), date.getDate());
    setDate(newDate);
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <div
            className="cursor-pointer z-[450] fixed top-0 left-0 w-screen h-screen"
            onClick={() => setShow(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="max-h-[315px] overflow-y-auto z-[500] p-3 absolute shadow-sm top-[54px] left-0 w-64 h-max bg-white border border-gray-300 rounded-md"
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
        </>
      )}
    </AnimatePresence>
  );
};

export default Calendar;
