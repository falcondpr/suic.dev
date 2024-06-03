import clsx from "clsx";
import { format } from "date-fns";

import { viewStore } from "../store/view";
import styles from "./ListYears.module.css";

interface ListYearsProps {
  date: Date;
  setYear: (value: string) => void;
}

const ListYears: React.FC<ListYearsProps> = ({ date, setYear }) => {
  const years = [];
  for (let year = 2030; year >= 1930; year--) {
    years.push(year);
  }

  const { setActiveView } = viewStore((state) => state);

  return (
    <div>
      <div className={styles.yearGrid}>
        {years.map((year, index) => (
          <button
            onClick={() => {
              setYear(year.toString());
              setActiveView("months");
            }}
            className={clsx(
              styles.yearButton,
              +format(date, "yyyy") === year
                ? styles.selectedYear
                : "",
              new Date().getFullYear() === year &&
                year !== date.getFullYear()
                ? styles.currentYear
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
