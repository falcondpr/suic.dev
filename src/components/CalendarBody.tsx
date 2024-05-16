import { useEffect, useState } from "react";
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
  startOfToday,
  startOfWeek,
} from "date-fns";
import clsx from "clsx";

import { ActiveViewProps } from "../App";
import { dateStore } from "../store/date";

interface CalendarBodyProps {
  setActiveView: (value: ActiveViewProps) => void;
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
  setActiveView,
}) => {
  const today = startOfToday();

  const { date, setDate } = dateStore((state) => state);
  const [currentMonth, setCurrentMonth] = useState(
    format(today, "MMM-yyyy")
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

  useEffect(() => {
    setDate(today);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setDate]);

  return (
    <div>
      <header className="flex items-center justify-between">
        <button
          className="text-gray-700 flex items-center gap-x-2 select-none"
          onClick={() => setActiveView("months")}
        >
          <span className="font-bold">
            {format(firstDayCurrentMonth, "MMMM yyyy")}
          </span>
          <ChevronDown className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-x-1">
          <button
            onClick={previousMonth}
            className="relative w-8 h-8 hover:bg-gray-200/50/70 rounded-lg grid place-items-center"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextMonth}
            className="relative w-8 h-8 hover:bg-gray-200/50/70 rounded-lg grid place-items-center"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main>
        <div className="grid mt-2 grid-cols-7 justify-items-center gap-x-1">
          <p className="select-none text-sm text-gray-400">S</p>
          <p className="select-none text-sm text-gray-400">M</p>
          <p className="select-none text-sm text-gray-400">T</p>
          <p className="select-none text-sm text-gray-400">W</p>
          <p className="select-none text-sm text-gray-400">T</p>
          <p className="select-none text-sm text-gray-400">F</p>
          <p className="select-none text-sm text-gray-400">S</p>
        </div>

        <div className="grid mt-2 grid-cols-7 justify-items-center">
          {days.map((day, index) => (
            <button
              key={index}
              className={clsx(
                "relative select-none",
                (index === 0 && colStartClasses[getDay(day)]) || "",
                "p-2 rounded-lg text-sm text-gray-700",
                isEqual(day, date) && !isToday(day)
                  ? "after:absolute after:top-0 after:rounded-lg after:-z-10 after:left-1/2 after:-translate-x-1/2 after:w-[31.58px] after:h-9 after:bg-gray-700 text-white after:hover:bg-gray-500/80"
                  : "",
                !isEqual(day, date) && isToday(day)
                  ? "text-[#FF3B30]"
                  : "",
                !isEqual(day, date) &&
                  !isToday(day) &&
                  isSameMonth(day, firstDayCurrentMonth)
                  ? "text-gray-900"
                  : "",
                !isEqual(day, date) &&
                  !isToday(day) &&
                  !isSameMonth(day, firstDayCurrentMonth)
                  ? "text-gray-300/90"
                  : "",
                isEqual(day, date) &&
                  !isToday(day) &&
                  !isSameMonth(day, firstDayCurrentMonth)
                  ? "after:absolute after:top-0 after:rounded-lg after:-z-10 after:left-1/2 after:-translate-x-1/2 after:w-[31.58px] after:h-9 after:bg-gray-400/90 text-white after:hover:bg-gray-200"
                  : "",
                isEqual(day, date) && isToday(day)
                  ? "after:absolute after:top-0 after:rounded-lg after:-z-10 after:left-1/2 after:-translate-x-1/2 after:w-[31.58px] after:h-9 after:bg-red-600 text-white hover:bg-red-500/70"
                  : "",
                !isEqual(day, date)
                  ? "hover:after:opacity-100 hover:after:absolute hover:after:top-0 hover:after:rounded-lg hover:after:-z-10 hover:after:left-1/2 hover:after:-translate-x-1/2 hover:after:w-[31.58px] hover:after:h-9 hover:after:bg-gray-200"
                  : "",
                isEqual(day, date) || isToday(day)
                  ? "font-semibold"
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
