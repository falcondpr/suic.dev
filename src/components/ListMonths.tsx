import clsx from "clsx";
import { format, setDefaultOptions } from "date-fns";

import { viewStore } from "../store/view";
import styles from "./ListMonths.module.css";

import { es } from "date-fns/locale";
setDefaultOptions({ locale: es });

interface ListMonthsProps {
  date: Date;
  setMonth: (value: string) => void;
}

const months = [
  { spanish: "Enero", english: "January", value: 0 },
  { spanish: "Febrero", english: "February", value: 1 },
  { spanish: "Marzo", english: "March", value: 2 },
  { spanish: "Abril", english: "April", value: 3 },
  { spanish: "Mayo", english: "May", value: 4 },
  { spanish: "Junio", english: "June", value: 5 },
  { spanish: "Julio", english: "July", value: 6 },
  { spanish: "Agosto", english: "August", value: 7 },
  { spanish: "Septiembre", english: "September", value: 8 },
  { spanish: "Octubre", english: "October", value: 9 },
  { spanish: "Noviembre", english: "November", value: 10 },
  { spanish: "Diciembre", english: "December", value: 11 },
];

const ListMonths: React.FC<ListMonthsProps> = ({
  date,
  setMonth,
}) => {
  const setActiveView = viewStore((state) => state.setActiveView);

  return (
    <div>
      <header>
        <button
          onClick={() => setActiveView("years")}
          className={styles.headerButton}
        >
          {format(date, "yyyy")}
        </button>
      </header>

      <div className={styles.monthGrid}>
        {months.map((month, index) => (
          <button
            onClick={() => {
              setMonth(month.value.toString());
              setActiveView("calendar");
            }}
            className={clsx(
              styles.monthButton,
              format(date, "MMMM") === month.spanish.toLowerCase()
                ? styles.selectedMonth
                : "",
              new Date().getMonth() === month.value &&
                date.getFullYear() === new Date().getFullYear() &&
                date.getMonth() !== month.value
                ? styles.currentMonth
                : ""
            )}
            key={index}
          >
            {month.spanish.slice(0, 3)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListMonths;
