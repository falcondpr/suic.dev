import { createContext, useState } from "react";

interface DateProviderProps {
  children: React.ReactNode;
}

interface DateContextProps {
  date: Date;
  setMonth: (value: number) => void;
  setYear: (value: number) => void;
  setDate: (value: Date) => void;
}

export const DateContext = createContext<DateContextProps>({
  date: new Date(),
  setMonth: () => {},
  setYear: () => {},
  setDate: () => {},
});

const DateProvider: React.FC<DateProviderProps> = ({ children }) => {
  // const storedData = localStorage.getItem("dateStore");

  const defaultDate = {
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  };

  const [date, setDate] = useState(
    new Date(defaultDate.year, defaultDate.month, defaultDate.day)
  );

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
    <DateContext.Provider
      value={{
        date,
        setMonth,
        setYear,
        setDate,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export default DateProvider;
