import clsx from "clsx";
import { format } from "date-fns";

import { viewStore } from "../store/view";
import { useContext } from "react";
import { DateContext } from "../context/DateContext";

interface ListYearsProps {}

const ListYears: React.FC<ListYearsProps> = () => {
  const years = [];
  for (let year = 2030; year >= 1970; year--) {
    years.push(year);
  }

  const { date, setYear } = useContext(DateContext);
  const { setActiveView } = viewStore((state) => state);

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {years.map((year, index) => (
          <button
            onClick={() => {
              setYear(year);
              setActiveView("calendar");
            }}
            className={clsx(
              "p-2 hover:bg-gray-100 text-gray-600 rounded-md",
              +format(date, "yyyy") === year
                ? "bg-red-600 text-white hover:bg-red-500"
                : ""
            )}
            key={index}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListYears;
