import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon } from "lucide-react";

import CalendarBody from "./CalendarBody";
import ListMonths from "./ListMonths";
import ListYears from "./ListYears";
import { viewStore } from "../store/view";
import { useEffect } from "react";

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

  const setDay = (day: string) => {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      +day
    );
    setDate(newDate);
  };

  const setMonth = (month: string) => {
    const newDate = new Date(
      date.getFullYear(),
      +month - 1,
      date.getDate()
    );
    setDate(newDate);
  };

  const setYear = (year: string) => {
    const newDate = new Date(+year, date.getMonth(), date.getDate());
    setDate(newDate);
  };

  useEffect(() => {
    setActiveView("calendar");
  }, [show, setActiveView]);

  return (
    <AnimatePresence>
      <div className="relative">
        <div className="flex items-center gap-x-3 w-max shadow-sm text-slate-800 relative z-[500] bg-white border border-gray-300 py-2 px-3 rounded-md">
          <div className="flex">
            <input
              name="years"
              value={String(date.getFullYear())}
              onChange={(e) => setYear(e.target.value)}
              className="outline-none w-12 text-center bg-white"
            />
            <div className="text-gray-400/70">/</div>
            <input
              name="months"
              value={String(date.getMonth() + 2)}
              onChange={(e) => setMonth(e.target.value)}
              className="outline-none w-7 text-center bg-white"
            />
            <div className="text-gray-400/70">/</div>
            <input
              type="day"
              value={String(date.getDate())}
              onChange={(e) => setDay(e.target.value)}
              className="outline-none w-7 text-center bg-white"
            />
          </div>

          <button
            className="w-min"
            onClick={() => (show ? setShow(false) : setShow(true))}
          >
            <CalendarIcon
              size={20}
              className="text-red-600 -mt-[1px]"
            />
          </button>
        </div>

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
      </div>
    </AnimatePresence>
  );
};

// export default Calendar;
